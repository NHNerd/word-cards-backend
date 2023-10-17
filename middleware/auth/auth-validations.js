import { body } from 'express-validator';
//? trim remuves space
export const authValidation = [
  body('email', '* invalid mail format').trim().notEmpty().isEmail(),
  body(
    'password',
    '! password must contain !: \n  * length 8-24 symbols \n  * letters: a-z A-Z \n  * numbers: 0-9 \n  * special characters: \'-!"#$%&()*,.:;?@[]^_`{|}~+<=>'
  )
    .notEmpty()
    .matches(/^[a-zA-Z0-9'\-!"#$%&()*,.:;?@[\]^_`{|}~+<=>]{8,24}$/),
];
