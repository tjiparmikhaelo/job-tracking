/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import pg from 'pg';
import { Sequelize, DataTypes } from 'sequelize';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

// Import models explicitly
import { Job } from './Job';

const env = process.env.NODE_ENV || 'development';

// Database configuration interface
interface DatabaseConfig {
  [key: string]: {
    username?: string;
    password?: string;
    database?: string;
    host?: string;
    port?: number;
    dialect: 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql';
    use_env_variable?: string;
    [key: string]: any;
  };
}

// Load config
const config: DatabaseConfig = require('../config/config.js');
const envConfig = config[env];

// Initialize Sequelize lazily
let sequelize: Sequelize;

const getSequelize = (): Sequelize => {
  if (!sequelize) {
    if (envConfig.use_env_variable) {
      const connectionString = process.env[envConfig.use_env_variable];
      if (!connectionString) {
        throw new Error(`Environment variable ${envConfig.use_env_variable} is not defined`);
      }
      sequelize = new Sequelize(connectionString, envConfig);
    } else {
      if (!envConfig.database || !envConfig.username) {
        throw new Error('Database configuration is incomplete');
      }
      
      sequelize = new Sequelize(
        envConfig.database,
        envConfig.username,
        envConfig.password || '',
        envConfig
      );
    }
  }
  return sequelize;
};

// Database interface for models
interface Database {
  sequelize: Sequelize;
  Sequelize: typeof Sequelize;
  Job: typeof Job;
  // Add other models here as you create them
  // User: typeof User;
  // Company: typeof Company;
}

let db: Database | null = null;

// Initialize models
const initializeModels = (): Database => {
  if (db) return db;
  
  const sequelizeInstance = getSequelize();
  
  // Initialize Job model
  Job.initModel(sequelizeInstance);
  
  // Add other models here as you create them
  // User.initModel(sequelizeInstance);
  // Company.initModel(sequelizeInstance);

  db = {
    sequelize: sequelizeInstance,
    Sequelize,
    Job,
    // User,
    // Company,
  };

  return db;
};

// Get database instance
const getDatabase = (): Database => {
  if (!db) {
    db = initializeModels();
  }
  return db;
};

// Set up associations
const setupAssociations = () => {
  const database = getDatabase();
  // Add associations here when you have them
  // Example:
  // Job.associate?.(database);
  // User.associate?.(database);
};

// Test database connection
const testConnection = async (): Promise<void> => {
  try {
    const sequelizeInstance = getSequelize();
    await sequelizeInstance.authenticate();
    console.log('✅ Database connection has been established successfully.');
    
    // Sync database in development
    if (process.env.NODE_ENV === 'development') {
      await sequelizeInstance.sync({ alter: true });
      console.log('✅ Database synchronized');
    }
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
  }
};

// Initialize database
const initializeDatabase = async () => {
  const database = getDatabase();
  await testConnection();
  setupAssociations();
  return database;
};

// Export individual models for direct import (recommended)
export { Job };
// export const sequelize = getSequelize();
export { Sequelize };

// Export database object for compatibility
export default getDatabase();

// Export initialization function for manual control
export { initializeDatabase };