import { statusCodes } from '../../config/index.js';

export const testGetController = (req, res) => {
  console.log("testGetController called");
  res.status(statusCodes.HTTP_200.code).json({ message: "GET request handled" });
};