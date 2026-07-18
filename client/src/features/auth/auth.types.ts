// User type
export interface User {
  id: string;
  email: string;
  full_name: string;
  is_email_verified?: boolean;
  created_at: string;
}

// Registration request
export interface RegisterRequest {
  email: string;
  password: string;
  full_name: string;
}

// Login request
export interface LoginRequest {
  email: string;
  password: string;
}

// Auth response
export interface AuthResponse {
  user: User;
  access_token: string;
  refresh_token: string;
}

// Refresh token response
export interface RefreshTokenResponse {
  access_token: string;
}

// Send OTP request
export interface SendOTPRequest {
  email: string;
}

// Verify OTP request
export interface VerifyOTPRequest {
  email: string;
  otp: string;
}

// Verify OTP response
export interface VerifyOTPResponse {
  verified: boolean;
  message: string;
}