import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

export const sequelize = new Sequelize(
  process.env.DB_NAME, 
  process.env.DB_USER, 
  process.env.DB_PASSWORD, 
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
  }
);

export const createDatabaseIfNotExist = async () => {
  try {
    console.log(`Attempting to create database if it doesn't exist: ${process.env.DB_NAME}`);
    const tempSequelize = new Sequelize('', process.env.DB_USER, process.env.DB_PASSWORD, {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      dialect: 'mysql',
    });
    await tempSequelize.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`);
    console.log(`Database '${process.env.DB_NAME}' checked/created successfully.`);
    await tempSequelize.close();
  } catch (error) {
    console.error('Failed to create database:', error);
  }
}
