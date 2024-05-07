import { verifyToken } from '../utils/index.js';

export const optionalAuthenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    req.user = null;
    next();
  } else {
    try {
      const decodedUser = verifyToken(token);
      req.user = decodedUser.user;
      next();
    } catch (error) {
      req.user = null;
      next();
    }
  }
};
