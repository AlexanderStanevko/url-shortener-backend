import { statusCodes } from '../../config/index.js';
import { loginController } from './loginController.js';
import { registerController } from './registerController.js';
import { methodFromUrl } from '../../utils/index.js';

export const authController = (req, res) => {
  console.log("authController called");
  try {
    const action = methodFromUrl(req.url);

    if (action === 'login') {
      return loginController(req, res);
    }
    
    if (action === 'register') {
      return registerController(req, res);
    }

    return res.status(statusCodes.HTTP_404.code).json({
      message: "Not found"
    });
  } catch (error) {
    console.error(error);
    res.status(statusCodes.HTTP_500.code).json({
      message: "Server error"
    });
  }
};
