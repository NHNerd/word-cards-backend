import TokenService from '../../controllers/auth/auth-service/auth-token-service.js';

async function checkAuth(req, res, next) {
  try {
    // get bearer access from header
    const authorizationHeader = await req.headers.authorization;
    if (!authorizationHeader) {
      return res
        .status(401)
        .json({ message: 'User is unauthorized :( \n req.headers.authorization is empty!' });
    }
    // convert string to array[bearer, access], and get access
    const accessToken = authorizationHeader.split(' ')[1];
    if (!accessToken) {
      return res.status(401).json({ message: 'User is unauthorized :( \n the access field is empty!' });
    }
    // accessToken validation
    const userData = await TokenService.validationAccessToken(accessToken);
    if (!userData) {
      return res.status(401).json({
        message: 'User is unauthorized :( unsucces validation(Access token is ucorrect or spoiled!',
      });
    }
    //? save to req for next handelr(controller or middleware)
    req.user = userData;
    next(); //? calls the next function in route
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
}

export default checkAuth;
