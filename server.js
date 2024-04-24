import express from 'express';
import apiRouter from './src/routes/index.js';

const app = express();

app.use(express.json());
app.use((req, res, next) => {
  console.log(`${req.method} request to ${req.url}`);
  next();
});
app.use('/api', apiRouter);
// app.get('/', (req, res) => {
//   res.send('Hello from A!')
// })

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
