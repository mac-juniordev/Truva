import pool from '../../config/database';
import { User, RegisterInput } from './auth.types';

export class AuthRepository {
  /**
   * Create a new user in the database
   */
  async createUser(data: RegisterInput & { password_hash: string }): Promise<User> {
    const query = `
      INSERT INTO users (email, password_hash, full_name)
      VALUES ($1, $2, $3)
      RETURNING id, email, full_name, password_hash, is_active, last_login, created_at, updated_at
    `;
    const values = [data.email, data.password_hash, data.full_name];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  /**
   * Find a user by their email address
   */
  async findUserByEmail(email: string): Promise<User | null> {
    const query = 'SELECT * FROM users WHERE email = $1';
    const result = await pool.query(query, [email.toLowerCase()]);
    return result.rows[0] || null;
  }

  /**
   * Find a user by their ID (excludes password_hash for security)
   */
  async findUserById(id: string): Promise<Omit<User, 'password_hash'> | null> {
    const query = `
      SELECT id, email, full_name, is_active, last_login, created_at, updated_at 
      FROM users 
      WHERE id = $1
    `;
    const result = await pool.query(query, [id]);
    return result.rows[0] || null;
  }

  /**
   * Save a refresh token for a user
   */
  async saveRefreshToken(userId: string, token: string, expiresAt: Date): Promise<void> {
    const query = `
      INSERT INTO refresh_tokens (user_id, token, expires_at)
      VALUES ($1, $2, $3)
      ON CONFLICT (token) DO UPDATE 
      SET user_id = $1, expires_at = $3, created_at = CURRENT_TIMESTAMP
    `;
    await pool.query(query, [userId, token, expiresAt]);
  }

  /**
   * Find a valid refresh token
   */
  async findRefreshToken(token: string): Promise<{ user_id: string } | null> {
    const query = `
      SELECT user_id 
      FROM refresh_tokens 
      WHERE token = $1 AND expires_at > NOW()
    `;
    const result = await pool.query(query, [token]);
    return result.rows[0] || null;
  }

  /**
   * Delete a refresh token (logout)
   */
  async deleteRefreshToken(token: string): Promise<void> {
    const query = 'DELETE FROM refresh_tokens WHERE token = $1';
    await pool.query(query, [token]);
  }

  /**
   * Delete all refresh tokens for a user (logout all devices)
   */
  async deleteAllRefreshTokens(userId: string): Promise<void> {
    const query = 'DELETE FROM refresh_tokens WHERE user_id = $1';
    await pool.query(query, [userId]);
  }

  /**
   * Update user's last login timestamp
   */
  async updateLastLogin(userId: string): Promise<void> {
    const query = 'UPDATE users SET last_login = NOW() WHERE id = $1';
    await pool.query(query, [userId]);
  }
}