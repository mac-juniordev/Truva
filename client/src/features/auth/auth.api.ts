import api from '../../services/axios';
import type { User, RegisterRequest, LoginRequest, AuthResponse, RefreshTokenResponse } from './auth.types';

/**
 * Register a new user
 */
export async function registerUser(data: RegisterRequest): Promise<AuthResponse> {
  const response = await api.post<AuthResponse>('/auth/register', data);
  return response.data;
}

/**
 * Login a user
 */
export async function loginUser(data: LoginRequest): Promise<AuthResponse> {
  const response = await api.post<AuthResponse>('/auth/login', data);
  return response.data;
}

/**
 * Send OTP to email
 */
export async function sendOTP(email: string): Promise<{ message: string }> {
  const response = await api.post<{ message: string }>('/auth/send-otp', { email });
  return response.data;
}

/**
 * Verify OTP
 */
export async function verifyOTP(email: string, otp: string): Promise<{ verified: boolean; message: string }> {
  const response = await api.post<{ verified: boolean; message: string }>('/auth/verify-otp', { email, otp });
  return response.data;
}

/**
 * Resend OTP
 */
export async function resendOTP(email: string): Promise<{ message: string }> {
  const response = await api.post<{ message: string }>('/auth/resend-otp', { email });
  return response.data;
}

/**
 * Refresh access token
 */
export async function refreshToken(refreshToken: string): Promise<RefreshTokenResponse> {
  const response = await api.post<RefreshTokenResponse>('/auth/refresh', {
    refresh_token: refreshToken,
  });
  return response.data;
}

/**
 * Logout user
 */
export async function logoutUser(refreshToken: string): Promise<void> {
  await api.post('/auth/logout', { refresh_token: refreshToken });
}

/**
 * Get current user
 */
export async function getCurrentUser(): Promise<User> {
  const response = await api.get<{ user: User }>('/auth/me');
  return response.data.user;
}