import { NextRequest } from 'next/server';
import { verifyToken, JwtPayload } from './auth';

export function getAuth(request: NextRequest): JwtPayload | null {
  const authHeader = request.headers.get('authorization') || request.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) return null;
  const token = authHeader.split(' ')[1];
  return verifyToken(token);
}
