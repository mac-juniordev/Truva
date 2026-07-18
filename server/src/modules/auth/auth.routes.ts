import { Router } from 'express';
import { AuthController } from './auth.controller';
import { authMiddleware } from '../../middleware/auth.middleware';

const router = Router();
const controller = new AuthController();

// Public routes (no authentication required)
router.post('/register', controller.register.bind(controller));
router.post('/login', controller.login.bind(controller));
router.post('/send-otp', controller.sendOTP.bind(controller));
router.post('/verify-otp', controller.verifyOTP.bind(controller));
router.post('/resend-otp', controller.resendOTP.bind(controller));
router.post('/refresh', controller.refresh.bind(controller));

// Protected routes (authentication required)
router.post('/logout', authMiddleware, controller.logout.bind(controller));
router.get('/me', authMiddleware, controller.me.bind(controller));

export default router;