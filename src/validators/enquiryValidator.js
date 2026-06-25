import { body } from 'express-validator';

export const createEnquiryValidator = [
  body('name')
    .notEmpty()
    .withMessage('Name is required')
    .trim(),
  body('phone')
    .notEmpty()
    .withMessage('Phone is required')
    .matches(/^[0-9+\-\s]{7,16}$/)
    .withMessage('Invalid phone number'),
  body('email')
    .isEmail()
    .withMessage('Valid email is required')
    .normalizeEmail(),
  body('interest')
    .notEmpty()
    .withMessage('Interest is required')
    .trim(),
  body('message')
    .optional({ checkFalsy: true })
    .trim(),
];

export const updateEnquiryValidator = [
  body('status')
    .optional()
    .isIn(['new', 'read', 'replied'])
    .withMessage('Invalid status'),
  body('name').optional().trim(),
  body('phone').optional().trim(),
  body('email').optional().isEmail().normalizeEmail(),
  body('interest').optional().trim(),
  body('message')
    .optional()
    .isLength({ min: 10 })
    .withMessage('Message must be at least 10 characters')
    .trim(),
];
