import { body } from 'express-validator';

export const createCategoryValidator = [
  body('name')
    .notEmpty()
    .withMessage('Category name is required')
    .trim(),
];

export const updateCategoryValidator = [
  body('name')
    .optional()
    .notEmpty()
    .withMessage('Category name cannot be empty')
    .trim(),
];
