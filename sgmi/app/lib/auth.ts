import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'dev_jwt_secret_change_me';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '4h';

export interface JwtPayload {
  id: number;
  email: string;
  role: string;
  nombre?: string;
  iat?: number;
  exp?: number;
}

export function signToken(payload: Partial<JwtPayload>) {
  // jsonwebtoken typings can be strict; cast expiresIn to any to accept env strings like '4h'
  return jwt.sign(payload as object, JWT_SECRET as any, { expiresIn: JWT_EXPIRES_IN as any });
}

export function verifyToken(token: string): JwtPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    return decoded;
  } catch (e) {
    return null;
  }
}
