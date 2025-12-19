import jwt, { JwtPayload } from 'jsonwebtoken';
import 'dotenv/config';
import { Request, Response, NextFunction } from 'express';

const JWT_SECRET = process.env.JWT_SECRET as string;

interface CustomRequest extends Request {
  userId?: string | number;
}

export default function authenticateToken(
  req: CustomRequest,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'Token missing' });
    return;
  }

  jwt.verify(token, JWT_SECRET, (err: jwt.VerifyErrors | null, decoded: JwtPayload | string | undefined) => {
    if (err) {
      res.status(403).json({ message: 'Invalid or expired token' });
      return;
    }
    if (typeof decoded === 'object' && decoded?.id) {
      req.userId = decoded.id;
    }
    next();
  });
}
