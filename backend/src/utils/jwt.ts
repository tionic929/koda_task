import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey123';

export interface TokenPayload {
  id: string;
  userId: string;
  email: string;
  role: string;
}

export const signToken = (payload: { id?: string; userId?: string; email: string; role: string }): string => {
  const userId = payload.userId || payload.id || '';
  const fullPayload: TokenPayload = {
    id: userId,
    userId,
    email: payload.email,
    role: payload.role,
  };
  return jwt.sign(fullPayload, JWT_SECRET, { expiresIn: '7d' });
};

export const verifyToken = (token: string): TokenPayload => {
  return jwt.verify(token, JWT_SECRET) as TokenPayload;
};
