import { Router } from 'express';
import { authValidation } from '../../middleware/auth/auth-validations.js';
import UserController from '../../controllers/auth/auth-user-controller.js';

const router = new Router();

router.post('/registration', authValidation, UserController.registration);
router.get('/activate/:link', UserController.activate);
router.post('/login', authValidation, UserController.login);
// Remove Refresh Token from BD
router.post('/logout', UserController.logout);
// if Access Token is dead sent Refresh Token and get duo Access & Refresh
router.get('/refresh', UserController.refresh);

export default router;
