import prisma from '../prisma/client.js';
import bcrypt from 'bcryptjs';
import { JwtService } from './jwtService.js';

export interface SignupPayload {
  fullName: string;
  email: string;
  password: string;
}

export interface SigninPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: {
    id: number;
    fullName: string;
    email: string;
  };
}

export class AuthService {
  static async signup(data: SignupPayload): Promise<AuthResponse> {
    const { fullName, email, password } = data;

    const existingUser = await prisma.users.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new Error('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.users.create({
      data: {
        fullName,
        email,
        password: hashedPassword,
      },
    });

    const token = JwtService.generateToken({ id: user.id });

    return {
      message: 'Account created successfully',
      token,
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
      },
    };
  }

  static async signin(data: SigninPayload): Promise<AuthResponse> {
    const { email, password } = data;

    const user = await prisma.users.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error('Email does not exist');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new Error('Incorrect password');
    }

    const token = JwtService.generateToken({ id: user.id });

    return {
      message: 'User has signed in successfully',
      token,
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
      },
    };
  }
}
