import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { validationResult } from 'express-validator';
import UserModel from '../../models/auth/auth-userModel.js';
import TokenModel from '../../models/auth/auth-tokenModel.js'; // Temp(for instant able delete collection)
import MailService from './auth-service/auth-mail-service.js';
import TokenService from './auth-service/auth-token-service.js';
import UserDto from '../../dtos/user-dto.js';
import { ApiError, customResponse } from '../service/errorHandler.js';

import dotenv from 'dotenv';
dotenv.config();

class UserController {
  async registration(req, res) {
    try {
      // Validation
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        //? map - create new array that haves object with field the msg only
        //? msg second element from body-validation
        const errorMessages = errors.array().map((element) => element.msg);
        //? Add elemnt in array start
        errorMessages.unshift('Incorrect-input: ');
        //? join convert array to string
        throw new ApiError(401, 'L O G U P:', errorMessages.join('\n')); //? 401 - Unauthorized
      }
      // get data
      const { email, password } = req.body; //? Creating 2 variables
      // check: is existe user with this email
      const candidate = await UserModel.findOne({ email: email });
      if (candidate) {
        throw new ApiError(409, 'L O G U P:', `User with email ${email} already exists!`); //? 409 - Conflict
      }
      // hash password
      const hashPassword = bcrypt.hashSync(password, 3); // It is a sync func
      // Create random link
      const activationLink = uuidv4();
      // Send actvaton email
      await MailService.sendActivationMail(
        email,
        `${process.env.API_URL}/api/activate/${activationLink}`
      );
      //* save user to DB
      const user = await UserModel.create({ email: email, password: hashPassword, activationLink });
      // Remuve sensetive information from User
      const userDto = new UserDto(user); // id, email, isActivated
      // Create tokens
      const tokens = await TokenService.generateTokens({ ...userDto });
      //* Save tokens to BD
      await TokenService.saveToken(userDto.id, tokens.refreshToken);
      // response to client( set into cookies )
      res.cookie('refreshToken', tokens.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      res.status(201).json({ message: `L O G U P: User ${userDto.email} successfully added :)` });
    } catch (error) {
      customResponse(res, error, ApiError);
    }
  }
  async activate(req, res) {
    try {
      // Get link from: router.get('/activate/:link'...
      const activationLink = await req.params.link;
      const user = await UserModel.findOne({ activationLink });
      if (!user) {
        throw new ApiError(404, 'A C T I V A T E: ', 'Uncorrect activation link'); //? 404 - Not Found
      }
      user.isActivated = true;
      // Asve user tu BD
      await user.save();
      // Swithc on client
      res.redirect(process.env.CLIENT_URL);
    } catch (error) {
      customResponse(res, error, ApiError);
    }
  }
  async login(req, res) {
    try {
      // get data
      const { email, password } = req.body; //? Creating 2 variables
      // check: is existe user with this email
      const user = await UserModel.findOne({ email: email });
      if (!user) {
        throw new ApiError(404, 'L O G I N: ', `User with this email ${email} is does not found :(`, 21); //? 404 - Not Found
      }

      // Compare passwords
      const isPasswordsEquals = await bcrypt.compare(password, user.password);
      if (!isPasswordsEquals) {
        throw new ApiError(401, 'L O G I N: ', 'Incorrect password!!!'); //? 401 - Unauthorized
      }
      // Remuve sensetive information from User
      const userDto = new UserDto(user); // id, email, isActivated
      // Create tokens
      const tokens = await TokenService.generateTokens({ ...userDto });
      //* Save tokens to BD
      await TokenService.saveToken(userDto.id, tokens.refreshToken);
      // response to client( set into cookies )
      res.cookie('refreshToken', tokens.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      res
        .status(200)
        .json({ message: `L O G I N: Welcome back ${userDto.email} :) \n ${tokens.accessToken}` });
    } catch (error) {
      customResponse(res, error, ApiError);
    }
  }
  //! What is need in clients body?
  async logout(req, res) {
    try {
      // get cookies from cookies :))
      const { refreshToken } = req.cookies;
      // remove token from BD
      TokenService.removeToken(refreshToken);
      // remove cookie
      res.clearCookie('refreshToken');
      res.status(200).json({ message: `L O G O U T: User ${req.body.email} is logged out :)` });
    } catch (error) {
      res.status(500).json({ message: `L O G O U T: ${error.message}` });
    }
  }
  async refresh(req, res) {
    try {
      // get cookies from cookies :))
      const { refreshToken } = req.cookies;
      // Check Token is existe?
      if (!refreshToken) {
        throw new ApiError(404, 'R E F R E S H: ', `User don't have refresh token! :(`); //? 404 - Not Found
      }
      // token validation
      const userData = await TokenService.validationRefreshToken(refreshToken);
      // Search token in BD
      const tokenFromBD = await TokenModel.findOne({ refreshToken });
      if (!userData || !tokenFromBD) {
        throw new ApiError(404, 'R E F R E S H: ', 'User is unauthorized :('); //? 404 - Unauthorized
      }
      // Get user from BD
      const user = await UserModel.findById(userData.id);
      // Remove sensetive information from User
      const userDto = new UserDto(user); // id, email, isActivated
      // Create tokens
      const tokens = await TokenService.generateTokens({ ...userDto });
      //* Save tokens to BD
      await TokenService.saveToken(userDto.id, tokens.refreshToken);
      // response to client( set into cookies )
      res.cookie('refreshToken', tokens.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      res.status(200).json({ message: `A C C E S S token is refreshed :) \n ${tokens.accessToken}` });
    } catch (error) {
      customResponse(res, error, ApiError);
    }
  }
}

export default new UserController();

//* Remove items from collections
// UserModel.deleteMany({})
//   .then(() => {
//     console.log('Коллекция UserModel успешно очищена');
//   })
//   .catch((err) => {
//     console.error('Ошибка при удалении коллекции UserModel:', err);
//   });
// TokenModel.deleteMany({})
//   .then(() => {
//     console.log('Коллекция TokenModel успешно очищена');
//   })
//   .catch((err) => {
//     console.error('Ошибка при удалении коллекции TokenModel:', err);
//   });
