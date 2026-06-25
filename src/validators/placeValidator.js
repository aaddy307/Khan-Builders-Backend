import { body } from 'express-validator';

export const createPlaceValidator = [
  body('name')
    .notEmpty()
    .withMessage('Place name is required')
    .trim(),
];

export const updatePlaceValidator = [
  body('name')
    .optional()
    .notEmpty()
    .withMessage('Place name cannot be empty')
    .trim(),
];
