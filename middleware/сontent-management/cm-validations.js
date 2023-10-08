import { body } from 'express-validator';
//? trim remuves space
export const listNameValidation = [
  body('list', '* The field - "list name" is empty! :(').trim().notEmpty(),
];
