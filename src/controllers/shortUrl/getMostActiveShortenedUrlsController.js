import { ShortenedUrl } from '../../models/ShortenedUrl.js';
import { statusCodes } from '../../config/index.js';
import { sequelize } from '../../db/index.js';

export const getMostActiveShortenedUrlsController = async (req, res) => {
  try {
    const mostActiveUrls = await ShortenedUrl.findAll({
      attributes: [
        'originalUrl',
        'shortenedCode',
        [sequelize.fn('sum', sequelize.col('clicks')), 'totalClicks'],
        [sequelize.fn('count', sequelize.fn('DISTINCT', sequelize.col('id'))), 'uniqueClicks']
      ],
      group: ['originalUrl', 'shortenedCode'],
      having: sequelize.literal('totalClicks > 0'),
      order: [[sequelize.literal('totalClicks'), 'DESC']],
      limit: 5,
      raw: true
    });

    const totalClicks = mostActiveUrls.reduce((total, url) => total + parseInt(url.totalClicks, 10), 0);
    const uniqueClicks = mostActiveUrls.reduce((total, url) => total + url.uniqueClicks, 0);

    res.status(statusCodes.HTTP_200.code).json({
      mostActiveUrls: mostActiveUrls.map(url => ({
        originalUrl: url.originalUrl,
        shortenedUrl: url.shortenedCode
      })),
      totalClicks,
      uniqueClicks
    });
  } catch (error) {
    console.error("Failed to retrieve most active URLs:", error);
    res.status(statusCodes.HTTP_500.code).json({ message: "Error retrieving most active shortened URLs", error: error.message });
  }
};
