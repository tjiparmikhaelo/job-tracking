/* eslint-disable @typescript-eslint/no-require-imports */
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

let sequelize: Sequelize | null = null;

/**
 * Initialize and return Sequelize instance
 */
export const getSequelize = (): Sequelize => {
  if (!sequelize) {
    sequelize = new Sequelize(
      process.env.DATABASE_URL!,
      {
        dialect: 'postgres',
        dialectModule: require('pg'),
        logging: process.env.NODE_ENV === 'development' ? console.log : false,
      }
    );
  }
  
  return sequelize;
};

/**
 * Test database connection
 */
export const testConnection = async (): Promise<void> => {
  try {
    const db = getSequelize();
    await db.authenticate();
    console.log('✅ Database connection established successfully.');
    
    // Sync database in development
    if (process.env.NODE_ENV === 'development') {
      await db.sync({ alter: true });
      console.log('✅ Database synchronized');
    }
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
    throw error;
  }
};

/**
 * Close database connection
 */
export const closeConnection = async (): Promise<void> => {
  if (sequelize) {
    await sequelize.close();
    sequelize = null;
    console.log('✅ Database connection closed');
  }
};

/**
 * Initialize database connection and sync
 */
export const initializeDatabase = async (): Promise<Sequelize> => {
  await testConnection();
  return getSequelize();
};