import { ShortenedUrl } from '../../models/ShortenedUrl.js';
import { statusCodes } from '../../config/index.js';

export const deleteShortenedUrlController = async (req, res) => {
  try {
    const { id } = req.params;

    const shortenedUrl = await ShortenedUrl.findByPk(id);

    if (!shortenedUrl) {
      return res.status(statusCodes.HTTP_404.code).json({ message: "Shortened URL not found" });
    }

    await shortenedUrl.destroy();

    res.status(statusCodes.HTTP_200.code).json({ message: "Shortened URL deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(statusCodes.HTTP_500.code).json({ message: "Error deleting shortened URL" });
  }
};
