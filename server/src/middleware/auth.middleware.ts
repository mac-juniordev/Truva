import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../utils/jwt';

/**
 * Authentication middleware
 * Verifies JWT token and attaches user to request
 */
export function authMiddleware(req: Request, res: Response, next: NextFunction): void {
  // Get Authorization header
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    res.status(401).json({ message: 'Authorization header required' });
    return;
  }

  // Extract token (Bearer <token>)
  const token = authHeader.split(' ')[1];
  
  if (!token) {
    res.status(401).json({ message: 'Token required' });
    return;
  }

  try {
    // Verify and decode the token
    const payload = verifyAccessToken(token);
    
    // Attach user to request for use in routes
    (req as any).user = payload;
    
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token' });
    return;
  }
}