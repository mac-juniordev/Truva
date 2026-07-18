import { Router } from 'express';
import authRoutes from '../modules/auth/auth.routes.js';

const router = Router();

// Mount all route modules
router.use('/auth', authRoutes);

// Add more routes here as we build them
// router.use('/users', userRoutes);
// router.use('/analysis', analysisRoutes);
// router.use('/analyzers', analyzerRoutes);
// router.use('/reports', reportRoutes);

export default router;