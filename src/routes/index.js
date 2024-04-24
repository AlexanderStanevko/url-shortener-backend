import express from 'express';
import testRoute from './testRoute.js';

const router = express.Router();

router.use('/test', testRoute);
// Другие роуты подключаются здесь...

export default router;
