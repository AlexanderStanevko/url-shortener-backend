import cors from 'cors';

const corsOptions = {
  origin: 'http://localhost:9000',
  optionsSuccessStatus: 200
};

export const corsMiddleware = cors(corsOptions);

