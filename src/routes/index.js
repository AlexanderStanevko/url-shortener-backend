import express from 'express';
import testRoute from './testRoute.js';
import authRoutes from './authRoutes.js'

const router = express.Router();

router.use('/test', testRoute);
router.use('/auth', authRoutes);
// ... дальше доавлят роуты

export default router;
