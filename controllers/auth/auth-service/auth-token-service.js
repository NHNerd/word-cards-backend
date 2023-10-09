import jwt from 'jsonwebtoken';
import TokenModel from '../../../models/auth/auth-tokenModel.js';

import dotenv from 'dotenv';
dotenv.config();

class TokenService {
  async generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '45s' });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' });
    return { accessToken, refreshToken };
  }

  //TODO 1 user 1 token: if user login on another device on other deviсes he's logeed !!!
  async saveToken(userId, refreshToken) {
    // is exist user with this id?
    const tokenData = await TokenModel.findOne({ userId: userId });
    // Old user: update refresh token
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }
    // User first time: create tokens
    const token = await TokenModel.create({ userId: userId, refreshToken: refreshToken });
    return token;
  }

  async removeToken(refreshToken) {
    const tokenData = await TokenModel.deleteOne({ refreshToken });
    return tokenData;
  }

  async validationAccessToken(accessToken) {
    try {
      const userData = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);
      return userData;
    } catch (error) {
      return null;
    }
  }

  async validationRefreshToken(refreshToken) {
    try {
      const userData = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
      return userData;
    } catch (error) {
      return null;
    }
  }
}

export default new TokenService();
