import { sequelize } from './index.js';

export const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    await sequelize.sync({ force: false }); 
    console.log('All models were synchronized successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};
