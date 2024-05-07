import { sequelize, createDatabaseIfNotExist } from './index.js';

export const connectToDatabase = async () => {
  try {
    await createDatabaseIfNotExist();
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    await sequelize.sync({ force: false }); 
    console.log('All models were synchronized successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};
