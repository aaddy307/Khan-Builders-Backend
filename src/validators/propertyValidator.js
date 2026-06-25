import { body } from 'express-validator';

export const createPropertyValidator = [
  body('name')
    .notEmpty()
    .withMessage('Property name is required')
    .trim(),
  body('place')
    .notEmpty()
    .withMessage('Location is required')
    .isMongoId()
    .withMessage('Invalid location'),
  body('type')
    .isIn(['Residential', 'Commercial', 'Villas', 'Plots'])
    .withMessage('Invalid property type'),
  body('status')
    .isIn(['Ongoing', 'Completed'])
    .withMessage('Invalid status'),
];

export const updatePropertyValidator = [
  body('name')
    .optional()
    .notEmpty()
    .withMessage('Property name cannot be empty')
    .trim(),
  body('place')
    .optional()
    .notEmpty()
    .withMessage('Location cannot be empty')
    .isMongoId()
    .withMessage('Invalid location'),
  body('type')
    .optional()
    .isIn(['Residential', 'Commercial', 'Villas', 'Plots'])
    .withMessage('Invalid property type'),
  body('status')
    .optional()
    .isIn(['Ongoing', 'Completed'])
    .withMessage('Invalid status'),
];
