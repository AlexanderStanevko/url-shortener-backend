import express from 'express';
import { commonController } from '../controllers/index.js';

const router = express.Router();

router.get('/:shortenedCode', commonController);

export default router;
