import { ShortenedUrl } from '../../models/ShortenedUrl.js';
import { statusCodes } from '../../config/index.js';
import { isValidUrl, generateShortId } from '../../utils/index.js';  // Ensure generateShortId is correctly imported or defined

export const createShortenedUrlController = async (req, res) => {
  try {
    const { originalUrl } = req.body;

    if (!isValidUrl(originalUrl)) {
      return res.status(statusCodes.HTTP_400.code).json({ message: "Invalid URL" });
    }

    const shortenedCode = generateShortId();

    const shortenedUrl = `http://localhost:3000/short/${shortenedCode}`;

    const newShortenedUrl = await ShortenedUrl.create({ 
      originalUrl, 
      shortenedCode, 
      shortenedUrl
    });

    const responseData = {
      message: "Shortened URL created successfully",
      urlData: {
        originalUrl: newShortenedUrl.originalUrl,
        shortenedUrl: newShortenedUrl.shortenedUrl, 
        shortenedCode: newShortenedUrl.shortenedCode,
        createdAt: newShortenedUrl.createdAt,
        clicks: newShortenedUrl.clicks,
        id: newShortenedUrl.id,
      }
    };

    res.status(statusCodes.HTTP_201.code).json(responseData);
  } catch (error) {
    console.error(error);
    res.status(statusCodes.HTTP_500.code).json({ message: "Error creating shortened URL" });
  }
};
