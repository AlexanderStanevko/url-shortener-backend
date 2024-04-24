import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('url_shortener_db', 'root', '227235', {
  host: 'localhost',
  port: 3307,
  dialect: 'mysql',
});
