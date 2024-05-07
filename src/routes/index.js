import express from 'express';
import testRoute from './testRoute.js';
import authRoutes from './authRoutes.js'
import shortUrlRoutes from './shortUrlRoutes.js'
import shortUrlRedirectRoutes from './shortUrlRedirectRoutes.js'
import { optionalAuthenticateToken } from '../middleware/index.js';


const router = express.Router();

router.use('/test', testRoute);
router.use('/auth', authRoutes);
router.use('/short', optionalAuthenticateToken, shortUrlRoutes);
router.use('/', shortUrlRedirectRoutes);

export default router;
