import jwt from 'jsonwebtoken';
import { config } from '../config/environment';

// Type for JWT payload
export interface JwtPayload {
  userId: string;
  email: string;
}

/**
 * Generate a short-lived access token
 * @param payload - User data to encode in token
 * @returns JWT access token
 */
export function generateAccessToken(payload: JwtPayload): string {
  return jwt.sign(payload, config.jwt.accessSecret, {
    expiresIn: config.jwt.accessExpiry,
  });
}

/**
 * Generate a long-lived refresh token
 * @param payload - User data to encode in token
 * @returns JWT refresh token
 */
export function generateRefreshToken(payload: JwtPayload): string {
  return jwt.sign(payload, config.jwt.refreshSecret, {
    expiresIn: config.jwt.refreshExpiry,
  });
}

/**
 * Verify and decode an access token
 * @param token - JWT access token
 * @returns Decoded payload
 * @throws Error if token is invalid or expired
 */
export function verifyAccessToken(token: string): JwtPayload {
  return jwt.verify(token, config.jwt.accessSecret) as JwtPayload;
}

/**
 * Verify and decode a refresh token
 * @param token - JWT refresh token
 * @returns Decoded payload
 * @throws Error if token is invalid or expired
 */
export function verifyRefreshToken(token: string): JwtPayload {
  return jwt.verify(token, config.jwt.refreshSecret) as JwtPayload;
}