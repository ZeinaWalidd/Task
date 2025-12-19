import { Request, Response } from 'express';
import { AuthService } from '../services/authService.js';

interface SignupRequest extends Request {
  body: {
    fullName: string;
    email: string;
    password: string;
  };
}

interface SigninRequest extends Request {
  body: {
    email: string;
    password: string;
  };
}

export const signup = async (req: SignupRequest, res: Response): Promise<void> => {
  try {
    const result = await AuthService.signup(req.body);
    res.status(201).json(result);
  } catch (error) {
    console.error('Signup error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    res.status(400).json({ message: 'Signup failed', error: message });
  }
};

export const signin = async (req: SigninRequest, res: Response): Promise<void> => {
  try {
    const result = await AuthService.signin(req.body);
    res.json(result);
  } catch (error) {
    console.error('Signin error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    res.status(400).json({ message: 'Signin failed', error: message });
  }
};
