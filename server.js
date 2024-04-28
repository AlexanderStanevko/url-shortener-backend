import express from 'express';
import apiRouter from './src/routes/index.js';
import { connectToDatabase } from './src/db/index.js';
import { 
  logger, 
  corsMiddleware
} from './src/middleware/index.js'
import dotenv from 'dotenv';

dotenv.config();
const app = express();

app.use(corsMiddleware);
app.use(express.json());
app.use(logger);
app.use('/', apiRouter);

const PORT = process.env.PORT || 3000;

connectToDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
