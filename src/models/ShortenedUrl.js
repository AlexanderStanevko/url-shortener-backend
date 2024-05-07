import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../db/index.js';

export class ShortenedUrl extends Model {}

ShortenedUrl.init({
  originalUrl: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  shortenedCode: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true,
  },
  shortenedUrl: { 
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true
  },
  clicks: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'User',
      key: 'id'
    }
  }
}, {
  sequelize,
  modelName: 'ShortenedUrl',
  tableName: 'shortened_urls',
});
