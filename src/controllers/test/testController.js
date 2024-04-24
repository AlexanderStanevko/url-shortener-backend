import { statusCodes } from '../../config/index.js';
import { testGetController } from './testGetController.js';
import { testPostController } from './testPostController.js';

export const testController = (req, res) => {
  console.log("testController called");
  try {
    if (req.method === 'GET') {
      return testGetController(req, res);
    }

    if (req.method === 'POST') {
      return testPostController(req, res);
    }

    return res.status(statusCodes.HTTP_400.code).json({
         message: "Unsupported method" 
    });
  } catch (error) {
    console.error(error);
    const { code, message } = statusCodes.HTTP_500;
    res.status(code).json({ message });
  }
};
