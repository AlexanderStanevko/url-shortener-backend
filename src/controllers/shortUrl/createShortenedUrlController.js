import { ShortenedUrl } from '../../models/ShortenedUrl.js';
import { statusCodes } from '../../config/index.js';
import { isValidUrl, generateShortId } from '../../utils/index.js'; 

export const createShortenedUrlController = async (req, res) => {
  try {
    const { originalUrl } = req.body;
    const userId = req.user ? req.user.id : null;

    if (!isValidUrl(originalUrl)) {
      return res.status(statusCodes.HTTP_400.code).json({ message: "Invalid URL" });
    }

    const shortenedCode = generateShortId();
    const baseURL = process.env.BASE_URL || `https://tsup.zapto.org`;
    const shortenedUrl = `${baseURL}/${shortenedCode}`;

    const newShortenedUrl = await ShortenedUrl.create({ 
      originalUrl, 
      shortenedCode, 
      shortenedUrl,
      userId
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
        userId: newShortenedUrl.userId
      }
    };

    res.status(statusCodes.HTTP_201.code).json(responseData);
  } catch (error) {
    console.error(error);
    res.status(statusCodes.HTTP_500.code).json({ message: "Error creating shortened URL" });
  }
};
