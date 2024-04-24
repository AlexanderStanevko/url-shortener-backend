import express from 'express';
import { authController } from '../controllers/auth/index.js';

const router = express.Router();

router.post('/login', authController);
router.post('/register', authController);

export default router;
