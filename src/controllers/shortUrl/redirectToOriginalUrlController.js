import { ShortenedUrl } from '../../models/ShortenedUrl.js';
import { statusCodes } from '../../config/index.js';

export const redirectToOriginalUrlController = async (req, res) => {
  try {
    const { shortenedCode } = req.query;

    const shortenedUrl = await ShortenedUrl.findOne({ where: { shortenedCode } });

    if (!shortenedUrl) {
      return res.status(statusCodes.HTTP_404.code).json({ message: "Shortened URL not found" });
    }

    shortenedUrl.clicks += 1;
    await shortenedUrl.save();

    res.redirect(shortenedUrl.originalUrl);
  } catch (error) {
    console.error(error);
    res.status(statusCodes.HTTP_500.code).json({ message: "Error redirecting to original URL" });
  }
};
