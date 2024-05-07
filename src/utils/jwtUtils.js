import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const generateToken = (user) => {
  const secretKey = process.env.SECRET_KEY;
  const token = jwt.sign({ user }, secretKey, { expiresIn: '1h' });
  return token;
};

export const verifyToken = (token) => {
  const secretKey = process.env.SECRET_KEY;
  try {
    const decodedToken = jwt.verify(token, secretKey);
    return decodedToken;
  } catch (error) {
    throw new Error('Invalid token');
  }
};
