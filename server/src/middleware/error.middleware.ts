import { Request, Response, NextFunction } from 'express';

/**
 * Global error handler middleware
 * Catches all errors and sends consistent response
 */
export function errorHandler(
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  console.error('Error:', err.message);
  console.error('Stack:', err.stack);

  // Send error response
  res.status(err.status || 500).json({
    message: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
}