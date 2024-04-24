// import express from 'express';
// import { testController } from '../controllers/index.js';

// const router = express.Router();

// router.all('/test', testController);

// export default router;
import express from 'express';
import { testController } from '../controllers/index.js';

const router = express.Router();

router.get('/', testController);
router.post('/', testController);

export default router;