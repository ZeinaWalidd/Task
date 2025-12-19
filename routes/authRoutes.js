import express from 'express';
const router = express.Router();
import { signup, signin } from '../controllers/authController.js';
import { body, validationResult } from 'express-validator';

const signupValidation = [
  body('fullName').notEmpty().withMessage('Full name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
    .matches(/[0-9]/).withMessage('Password must contain a number')
    .matches(/[a-zA-Z]/).withMessage('Password must contain a letter')
    .matches(/[^a-zA-Z0-9]/).withMessage('Password must contain a special character'),
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

router.post('/signup', signupValidation, validate, signup);
router.post('/signin', signin);

export default router;