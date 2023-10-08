import { body } from 'express-validator';
//? trim remuves space
export const authValidation = [
  body('email', '* invalid mail format').trim().notEmpty().isEmail(),
  body('password', '* password must contain at least 5 characters').notEmpty().isLength({ min: 5 }),
];
