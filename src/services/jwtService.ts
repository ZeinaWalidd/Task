import jwt from 'jsonwebtoken';
import { JwtPayload, SignOptions } from 'jsonwebtoken';

const JWT_SECRET: string = process.env.JWT_SECRET || 'default-secret-key';

export interface TokenPayload {
  id: string | number;
}

export class JwtService {
  static generateToken(payload: TokenPayload, expiresIn: string = '7d'): string {
    const options: SignOptions = { expiresIn: expiresIn as any };
    return jwt.sign(payload, JWT_SECRET, options);
  }

  static verifyToken(token: string): TokenPayload | null {
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
      if (typeof decoded === 'object' && decoded.id) {
        return { id: decoded.id };
      }
      return null;
    } catch (error) {
      return null;
    }
  }

  static decodeToken(token: string): TokenPayload | null {
    try {
      const decoded = jwt.decode(token) as JwtPayload;
      if (typeof decoded === 'object' && decoded.id) {
        return { id: decoded.id };
      }
      return null;
    } catch (error) {
      return null;
    }
  }
}
