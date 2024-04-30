import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../db/index.js';
import shortid from 'shortid';

export class ShortenedUrl extends Model {}

ShortenedUrl.init({
  originalUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  shortenedCode: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  shortenedUrl: { 
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  clicks: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  }
}, {
  sequelize,
  modelName: 'ShortenedUrl',
  tableName: 'shortened_urls',
});

// ShortenedUrl.beforeCreate((shortenedUrl) => {
//   shortenedUrl.shortenedCode = shortid.generate();
// });
