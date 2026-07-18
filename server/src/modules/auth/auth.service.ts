import { AuthRepository } from './auth.repository';
import { hashPassword, comparePassword } from '../../utils/hash';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../../utils/jwt';
import { RegisterInput, LoginInput, AuthResponse, UserResponse } from './auth.types';

export class AuthService {
  private repository: AuthRepository;

  constructor() {
    this.repository = new AuthRepository();
  }

  /**
   * Register a new user
   */
  async register(data: RegisterInput): Promise<AuthResponse> {
    // Check if user already exists
    const existingUser = await this.repository.findUserByEmail(data.email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    // Hash the password
    const password_hash = await hashPassword(data.password);

    // Create the user
    const user = await this.repository.createUser({
      ...data,
      password_hash,
    });

    // Generate tokens
    const access_token = generateAccessToken({ 
      userId: user.id, 
      email: user.email 
    });
    
    const refresh_token = generateRefreshToken({ 
      userId: user.id, 
      email: user.email 
    });

    // Save refresh token (expires in 7 days)
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);
    await this.repository.saveRefreshToken(user.id, refresh_token, expiresAt);

    // Return user data and tokens
    return {
      user: {
        id: user.id,
        email: user.email,
        full_name: user.full_name,
        created_at: user.created_at,
      },
      access_token,
      refresh_token,
    };
  }

  /**
   * Login an existing user
   */
  async login(data: LoginInput): Promise<AuthResponse> {
    // Find the user
    const user = await this.repository.findUserByEmail(data.email);
    if (!user) {
      throw new Error('Invalid email or password');
    }

    // Check if user is active
    if (!user.is_active) {
      throw new Error('Account is deactivated');
    }

    // Verify password
    const isPasswordValid = await comparePassword(data.password, user.password_hash);
    if (!isPasswordValid) {
      throw new Error('Invalid email or password');
    }

    // Update last login
    await this.repository.updateLastLogin(user.id);

    // Generate tokens
    const access_token = generateAccessToken({ 
      userId: user.id, 
      email: user.email 
    });
    
    const refresh_token = generateRefreshToken({ 
      userId: user.id, 
      email: user.email 
    });

    // Save refresh token
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);
    await this.repository.saveRefreshToken(user.id, refresh_token, expiresAt);

    // Return user data and tokens
    return {
      user: {
        id: user.id,
        email: user.email,
        full_name: user.full_name,
        created_at: user.created_at,
      },
      access_token,
      refresh_token,
    };
  }

  /**
   * Refresh access token using refresh token
   */
  async refreshToken(refreshToken: string): Promise<{ access_token: string }> {
    // Verify the refresh token exists and is valid
    const tokenData = await this.repository.findRefreshToken(refreshToken);
    if (!tokenData) {
      throw new Error('Invalid or expired refresh token');
    }

    // Verify the JWT signature
    const payload = verifyRefreshToken(refreshToken);

    // Check if user still exists
    const user = await this.repository.findUserById(payload.userId);
    if (!user) {
      throw new Error('User not found');
    }

    // Generate new access token
    const access_token = generateAccessToken({ 
      userId: user.id, 
      email: user.email 
    });

    return { access_token };
  }

  /**
   * Logout - invalidate refresh token
   */
  async logout(refreshToken: string): Promise<void> {
    await this.repository.deleteRefreshToken(refreshToken);
  }

  /**
   * Get user by ID (excluding sensitive data)
   */
  async getUserById(id: string): Promise<UserResponse | null> {
    return this.repository.findUserById(id);
  }

  /**
   * Logout from all devices
   */
  async logoutAll(userId: string): Promise<void> {
    await this.repository.deleteAllRefreshTokens(userId);
  }
}