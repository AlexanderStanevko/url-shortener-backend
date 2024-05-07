import { ShortenedUrl } from '../../models/ShortenedUrl.js';
import { statusCodes } from '../../config/index.js';
import { sequelize } from '../../db/index.js';

export const getMostActiveShortenedUrlsController = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(statusCodes.HTTP_401.code).json({ message: "User unauthorized" });
    }

    const userId = req.user.id;

    const mostActiveUrls = await ShortenedUrl.findAll({
      where: { userId: userId },
      attributes: [
        'originalUrl',
        'shortenedUrl',
        [sequelize.fn('sum', sequelize.col('clicks')), 'totalClicks'],
        [sequelize.fn('count', sequelize.fn('DISTINCT', sequelize.col('id'))), 'uniqueClicks']
      ],
      group: ['originalUrl', 'shortenedUrl'],
      having: sequelize.literal('totalClicks > 0'),
      order: [[sequelize.literal('totalClicks'), 'DESC']],
      limit: 5,
      raw: true
    });

    res.status(statusCodes.HTTP_200.code).json({
      mostActiveUrls: mostActiveUrls.map(url => ({
        originalUrl: url.originalUrl,
        shortenedUrl: url.shortenedUrl,
        totalClicks: url.totalClicks,
        uniqueClicks: url.uniqueClicks
      }))
    });
  } catch (error) {
    console.error("Failed to retrieve most active URLs:", error);
    res.status(statusCodes.HTTP_500.code).json({ message: "Error retrieving most active shortened URLs", error: error.message });
  }
};

