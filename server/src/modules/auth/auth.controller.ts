import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { OTPService } from './auth.otp.service';
import { registerSchema, loginSchema, refreshTokenSchema, verifyOTPSchema } from './auth.validators';

const authService = new AuthService();
const otpService = new OTPService();

export class AuthController {
  /**
   * POST /api/auth/register
   * Register a new user (requires email verification first)
   */
  async register(req: Request, res: Response): Promise<void> {
    try {
      // Validate request body
      const validatedData = registerSchema.parse(req.body);
      
      // Check if OTP verification was completed
const isVerified = await otpService.hasVerifiedOTP(
  validatedData.email
);

if (!isVerified) {
  res.status(400).json({
    message: 'Email must be verified before registration'
  });
  return;
}
      
      // Register the user
      const result = await authService.register(validatedData);
      
      res.status(201).json(result);
    } catch (error: any) {
      if (error.name === 'ZodError') {
        res.status(400).json({ 
          message: 'Validation error', 
          errors: error.errors 
        });
        return;
      }
      
      res.status(400).json({ 
        message: error.message 
      });
    }
  }

  /**
   * POST /api/auth/login
   * Login an existing user
   */
  async login(req: Request, res: Response): Promise<void> {
    try {
      const validatedData = loginSchema.parse(req.body);
      
      // Check if email is verified
      const isVerified = await otpService.isEmailVerified(validatedData.email);
      if (!isVerified) {
        res.status(400).json({ 
          message: 'Email not verified. Please verify your email first.' 
        });
        return;
      }
      
      const result = await authService.login(validatedData);
      res.json(result);
    } catch (error: any) {
      if (error.name === 'ZodError') {
        res.status(400).json({ 
          message: 'Validation error', 
          errors: error.errors 
        });
        return;
      }
      
      res.status(401).json({ 
        message: error.message 
      });
    }
  }

  /**
   * POST /api/auth/send-otp
   * Send OTP to email
   */
  async sendOTP(req: Request, res: Response): Promise<void> {
    try {
      const { email } = req.body;
      
      if (!email) {
        res.status(400).json({ message: 'Email is required' });
        return;
      }

      await otpService.sendOTP(email);
      
      res.json({ 
        message: 'OTP sent successfully',
        email: email
      });
    } catch (error: any) {
      res.status(400).json({ 
        message: error.message || 'Failed to send OTP' 
      });
    }
  }

  /**
   * POST /api/auth/verify-otp
   * Verify OTP
   */
  async verifyOTP(req: Request, res: Response): Promise<void> {
    try {
      const validatedData = verifyOTPSchema.parse(req.body);
      
      const isValid = await otpService.verifyOTP(
        validatedData.email,
        validatedData.otp
      );
      
      if (isValid) {
        res.json({ 
          message: 'OTP verified successfully',
          verified: true
        });
      } else {
        res.status(400).json({ 
          message: 'Invalid or expired OTP',
          verified: false
        });
      }
    } catch (error: any) {
      if (error.name === 'ZodError') {
        res.status(400).json({ 
          message: 'Validation error', 
          errors: error.errors 
        });
        return;
      }
      
      res.status(400).json({ 
        message: error.message || 'Failed to verify OTP'
      });
    }
  }

  /**
   * POST /api/auth/resend-otp
   * Resend OTP
   */
  async resendOTP(req: Request, res: Response): Promise<void> {
    try {
      const { email } = req.body;
      
      if (!email) {
        res.status(400).json({ message: 'Email is required' });
        return;
      }

      await otpService.resendOTP(email);
      
      res.json({ 
        message: 'OTP resent successfully',
        email: email
      });
    } catch (error: any) {
      res.status(400).json({ 
        message: error.message || 'Failed to resend OTP' 
      });
    }
  }

  /**
   * POST /api/auth/refresh
   * Get a new access token using refresh token
   */
  async refresh(req: Request, res: Response): Promise<void> {
    try {
      const validatedData = refreshTokenSchema.parse(req.body);
      const result = await authService.refreshToken(validatedData.refresh_token);
      res.json(result);
    } catch (error: any) {
      if (error.name === 'ZodError') {
        res.status(400).json({ 
          message: 'Validation error', 
          errors: error.errors 
        });
        return;
      }
      
      res.status(401).json({ 
        message: error.message 
      });
    }
  }

  /**
   * POST /api/auth/logout
   * Logout - invalidate refresh token
   */
  async logout(req: Request, res: Response): Promise<void> {
    try {
      const { refresh_token } = req.body;
      
      if (refresh_token) {
        await authService.logout(refresh_token);
      }
      
      res.json({ message: 'Logged out successfully' });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  /**
   * GET /api/auth/me
   * Get current authenticated user
   */
  async me(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user?.userId;
      
      if (!userId) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }
      
      const user = await authService.getUserById(userId);
      
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      
      res.json({ user });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}