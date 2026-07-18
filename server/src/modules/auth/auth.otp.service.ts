import { randomInt } from 'crypto';
import pool from '../../config/database';
import { sendOTPEmail } from '../../config/nodemailer';

export class OTPService {
  /**
   * Generate a 4-digit OTP
   */
  private generateOTP(): string {
    return randomInt(1000, 9999).toString().padStart(4, '0');
  }


  /**
   * Send OTP to user's email
   */
  async sendOTP(email: string): Promise<void> {

    const normalizedEmail = email.toLowerCase();

    // Generate OTP
    const otp = this.generateOTP();

    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 5);


    /**
     * Store OTP
     * Requires UNIQUE(email) on otp_verifications
     */
    const query = `
      INSERT INTO otp_verifications
      (
        email,
        otp_code,
        expires_at,
        attempts,
        is_used,
        created_at
      )
      VALUES
      (
        $1,
        $2,
        $3,
        0,
        false,
        CURRENT_TIMESTAMP
      )

      ON CONFLICT (email)
      DO UPDATE SET
        otp_code = EXCLUDED.otp_code,
        expires_at = EXCLUDED.expires_at,
        attempts = 0,
        is_used = false,
        created_at = CURRENT_TIMESTAMP
    `;


    await pool.query(query, [
      normalizedEmail,
      otp,
      expiresAt,
    ]);


    await sendOTPEmail(
      normalizedEmail,
      otp
    );


    console.log(
      `📧 OTP sent to ${normalizedEmail}: ${otp}`
    );
  }



  /**
   * Verify OTP
   */
  async verifyOTP(
    email: string,
    otp: string
  ): Promise<boolean> {

    const normalizedEmail = email.toLowerCase();


    const query = `
      SELECT 
        otp_code,
        expires_at,
        attempts,
        is_used

      FROM otp_verifications

      WHERE email = $1

      ORDER BY created_at DESC

      LIMIT 1
    `;


    const result = await pool.query(
      query,
      [normalizedEmail]
    );


    if (result.rows.length === 0) {
      return false;
    }


    const record = result.rows[0];


    // Already used
    if (record.is_used) {
      return false;
    }


    // Expired
    if (
      new Date(record.expires_at) < new Date()
    ) {
      return false;
    }


    // Too many attempts
    if (record.attempts >= 3) {
      return false;
    }



    // Increase attempts
    await pool.query(
      `
      UPDATE otp_verifications

      SET attempts = attempts + 1

      WHERE email = $1
      `,
      [normalizedEmail]
    );



    // Wrong OTP
    if (record.otp_code !== otp) {
      return false;
    }



    // Mark OTP verified
    await pool.query(
      `
      UPDATE otp_verifications

      SET 
        is_used = true

      WHERE email = $1
      `,
      [normalizedEmail]
    );


    return true;
  }




  /**
   * Check OTP verification before registration
   *
   * This is used because the user
   * does not exist in users table yet.
   */
  async hasVerifiedOTP(
    email: string
  ): Promise<boolean> {

    const normalizedEmail = email.toLowerCase();


    const query = `
      SELECT id

      FROM otp_verifications

      WHERE email = $1

      AND is_used = true

      ORDER BY created_at DESC

      LIMIT 1
    `;


    const result = await pool.query(
      query,
      [normalizedEmail]
    );


    return result.rows.length > 0;
  }




  /**
   * Check if registered user's email is verified
   *
   * Used for login
   */
  async isEmailVerified(
    email: string
  ): Promise<boolean> {

    const normalizedEmail = email.toLowerCase();


    const query = `
      SELECT is_email_verified

      FROM users

      WHERE email = $1
    `;


    const result = await pool.query(
      query,
      [normalizedEmail]
    );


    if (result.rows.length === 0) {
      return false;
    }


    return Boolean(
      result.rows[0].is_email_verified
    );
  }




  /**
   * Resend OTP
   */
  async resendOTP(
    email: string
  ): Promise<void> {

    await this.sendOTP(email);

  }
}