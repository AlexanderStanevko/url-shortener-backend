import { statusCodes } from '../../config/index.js';
import {
  redirectToOriginalUrlController,
} from './index.js'
import { methodFromUrl } from '../../utils/index.js';

export const commonController = (req, res) => {
  console.log('redirect called')
  try {
    const action = methodFromUrl(req.url);
    console.log('action: ', action);
    
    if (action) {
      return redirectToOriginalUrlController(req, res);
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
