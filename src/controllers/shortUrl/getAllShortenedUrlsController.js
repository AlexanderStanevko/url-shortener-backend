import { ShortenedUrl } from '../../models/ShortenedUrl.js';
import { statusCodes } from '../../config/index.js';

export const getAllShortenedUrlsController = async (req, res) => {
  try {
    const shortenedUrls = await ShortenedUrl.findAll({
      order: [['createdAt', 'DESC']]
    });

    const formattedUrls = shortenedUrls.map(url => ({
      originalUrl: url.originalUrl,
      shortenedUrl: url.shortenedUrl,
      shortenedCode: url.shortenedCode,
      createdAt: url.createdAt,
      clicks: url.clicks,
      id: url.id
    }));

    res.status(statusCodes.HTTP_200.code).json(formattedUrls);
  } catch (error) {
    console.error(error);
    res.status(statusCodes.HTTP_500.code).json({ message: "Error retrieving shortened URLs" });
  }
};
