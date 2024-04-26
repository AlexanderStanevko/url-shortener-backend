import express from 'express';
import { authController } from '../controllers/index.js';

const router = express.Router();

router.post('/login', authController);
router.post('/register', authController);

export default router;
