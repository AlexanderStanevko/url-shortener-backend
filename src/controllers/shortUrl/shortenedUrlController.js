import { statusCodes } from '../../config/index.js';
import {
  createShortenedUrlController,
  redirectToOriginalUrlController,
  getAllShortenedUrlsController,
  deleteShortenedUrlController
} from './index.js'
import { methodFromUrl } from '../../utils/index.js';

export const shortenedUrlController = (req, res) => {
  console.log("shortenedUrlController called");
  try {
    const action = methodFromUrl(req.url);

    if (action === 'create') {
      return createShortenedUrlController(req, res);
    }

    if (action === 'all') {
      return getAllShortenedUrlsController(req, res);
    }

    if (action === 'delete') {
      return deleteShortenedUrlController(req, res);
    }
    
    if (!['create', 'all', 'delete'].includes(action)) {
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
