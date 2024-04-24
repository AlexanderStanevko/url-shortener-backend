import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../db/index.js';

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
  clicks: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  domain: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  sequelize,
  modelName: 'ShortenedUrl',
});
