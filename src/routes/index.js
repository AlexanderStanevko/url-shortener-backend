import express from 'express';
import testRoute from './testRoute.js';
import authRoutes from './authRoutes.js'
import shortUrlRoutes from './shortUrlRoutes.js'

const router = express.Router();

router.use('/test', testRoute);
router.use('/auth', authRoutes);
router.use('/short', shortUrlRoutes);
// ... дальше доавлят роуты

export default router;
