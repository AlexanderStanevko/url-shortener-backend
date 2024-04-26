import express from 'express';
import { shortenedUrlController } from '../controllers/index.js';

const router = express.Router();

router.post('/create', shortenedUrlController);
router.get('/:shortUrl', shortenedUrlController);

export default router;
