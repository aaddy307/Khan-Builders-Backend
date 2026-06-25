import { body } from 'express-validator';

export const updateContactValidator = [
  body('phone')
    .optional()
    .isArray()
    .withMessage('Phone must be an array'),
  body('email')
    .optional()
    .isArray()
    .withMessage('Email must be an array'),
  body('address')
    .optional()
    .isString()
    .withMessage('Address must be a string'),
  body('mapLink')
    .optional()
    .isString()
    .withMessage('Map link must be a string'),
  body('businessHours')
    .optional()
    .isArray()
    .withMessage('Business hours must be an array'),
];
