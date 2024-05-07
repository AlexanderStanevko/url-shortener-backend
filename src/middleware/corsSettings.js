import cors from 'cors';

const corsOptions = {
  origin: ['http://localhost:9000', 'https://hammerhead-app-cngdy.ondigitalocean.app'],
  optionsSuccessStatus: 200
};

export const corsMiddleware = cors(corsOptions);
