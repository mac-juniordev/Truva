// User type returned from database
export interface User {
  id: string;
  email: string;
  password_hash: string;
  full_name: string;
  is_active: boolean;
  last_login: Date | null;
  created_at: Date;
  updated_at: Date;
}

// User data without sensitive fields (for API responses)
export interface UserResponse {
  id: string;
  email: string;
  full_name: string;
  created_at: Date;
}

// Input for user registration
export interface RegisterInput {
  email: string;
  password: string;
  full_name: string;
}

// Input for user login
export interface LoginInput {
  email: string;
  password: string;
}

// Response after authentication
export interface AuthResponse {
  user: UserResponse;
  access_token: string;
  refresh_token: string;
}

// Response for token refresh
export interface RefreshTokenResponse {
  access_token: string;
}

// JWT payload structure
export interface JwtPayload {
  userId: string;
  email: string;
}