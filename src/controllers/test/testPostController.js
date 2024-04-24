import { statusCodes } from '../../config/index.js';

export const testPostController  = (req, res) => {
  res.status(statusCodes.HTTP_200).json({ message: "POST request handled" });
};