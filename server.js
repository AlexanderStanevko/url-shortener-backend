import express from 'express';
import apiRouter from './src/routes/index.js';
import { connectToDatabase } from './src/db/index.js';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

// console.log('All environment variables:');
// console.log(process.env);

app.use(express.json());
app.use((req, res, next) => {
  console.log(`${req.method} request to ${req.url}`);
  next();
});
app.use('/', apiRouter);

const PORT = process.env.PORT || 3000;

connectToDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
