import { statusCodes } from '../../config/index.js';
import { createShortenedUrlController } from './createShortenedUrlController.js';
import { redirectToOriginalUrlController } from './redirectToOriginalUrlController.js'; // Подразумевается, что у вас есть контроллер для перехода по сокращенному URL
import { methodFromUrl } from '../../utils/index.js';

export const shortenedUrlController = (req, res) => {
  console.log("shortenedUrlController called");
  try {
    const action = methodFromUrl(req.url);

    if (action === 'create') {
      return createShortenedUrlController(req, res);
    }
    
    if (action !== 'create') {
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
