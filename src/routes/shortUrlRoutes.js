import express from 'express';
import { shortenedUrlController } from '../controllers/index.js';

const router = express.Router();

router.post('/create', shortenedUrlController);
router.get('/:shortenedCode', shortenedUrlController);
router.get('/all', shortenedUrlController);
router.delete('/:id', shortenedUrlController);
router.get('/mostActive', shortenedUrlController);

export default router;
