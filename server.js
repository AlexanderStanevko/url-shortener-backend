import express from 'express';
import apiRouter from './src/routes/index.js';
import { connectToDatabase } from './src/db/index.js';

const app = express();

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
