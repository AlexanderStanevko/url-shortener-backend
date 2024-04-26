import { ShortenedUrl } from '../../models/ShortenedUrl.js';
import { statusCodes } from '../../config/index.js';
import { isValidUrl, generateShortId } from '../../utils/index.js';

export const createShortenedUrlController = async (req, res) => {
  try {
    const { originalUrl } = req.body;

    if (!isValidUrl(originalUrl)) {
      return res.status(statusCodes.HTTP_400.code).json({ message: "Invalid URL" });
    }

    const shortenedCode = generateShortId();

    const newShortenedUrl = await ShortenedUrl.create({ originalUrl, shortenedCode });

    res.status(statusCodes.HTTP_201.code).json({
      message: "Shortened URL created successfully",
      originalUrl: newShortenedUrl.originalUrl,
      // shortenedUrl: `https://${req.headers.host}/${newShortenedUrl.shortenedCode}`,
      shortenedUrl: `{newShortenedUrl.shortenedCode}`,
    });
  } catch (error) {
    console.error(error);
    res.status(statusCodes.HTTP_500.code).json({ message: "Error creating shortened URL" });
  }
};
