import express from 'express';
import { testController } from '../controllers/index.js';

const router = express.Router();

router.get('/', testController);
router.post('/', testController);

export default router;