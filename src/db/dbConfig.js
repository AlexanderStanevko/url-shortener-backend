import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('url_shortener_db', 'root', '227235', {
  host: 'localhost',
  port: 3307,
  dialect: 'mysql',
});

// import { Sequelize } from 'sequelize';

// export const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   dialect: 'mysql',
// });
