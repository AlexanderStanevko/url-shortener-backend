import { statusCodes } from '../../config/index.js';
import {
  createShortenedUrlController,
  redirectToOriginalUrlController,
  getAllShortenedUrlsController,
  deleteShortenedUrlController,
  getMostActiveShortenedUrlsController
} from './index.js'
import { methodFromUrl } from '../../utils/index.js';

export const shortenedUrlController = (req, res) => {
  console.log('CONTROLLER called')
  try {
    console.log('URL: ', req.url);
    const action = methodFromUrl(req.url);
    console.log('action: ', action);

    if (action === 'create') {
      return createShortenedUrlController(req, res);
    }

    if (action === 'all') {
      return getAllShortenedUrlsController(req, res);
    }

    if (req.method === 'DELETE') {
      return deleteShortenedUrlController(req, res);
    }

    if (action === 'mostActive') {
      return getMostActiveShortenedUrlsController(req, res);
    }

    
    
    if (!['create', 'all', 'delete', 'mostActive'].includes(action)) {
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
