import dotenv from 'dotenv';
import type { SignOptions } from 'jsonwebtoken';

// Load environment variables
dotenv.config();

// Validate required environment variables
const requiredEnvVars = [
  'PORT',
  'DB_HOST',
  'DB_PORT',
  'DB_NAME',
  'DB_USER',
  'DB_PASSWORD',
  'JWT_ACCESS_SECRET',
  'JWT_REFRESH_SECRET',
  'FRONTEND_URL'
];

// Check for missing environment variables
for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    console.warn(`⚠️ Missing environment variable: ${envVar}`);
  }
}

// Export configuration
export const config = {
  port: parseInt(process.env.PORT || '5000'),
  nodeEnv: process.env.NODE_ENV || 'development',

  database: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    name: process.env.DB_NAME || 'truva',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
  },

  jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET || 'access-secret-key',
    refreshSecret: process.env.JWT_REFRESH_SECRET || 'refresh-secret-key',

    accessExpiry: '15m' as SignOptions['expiresIn'],
    refreshExpiry: '7d' as SignOptions['expiresIn'],
  },

  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
};