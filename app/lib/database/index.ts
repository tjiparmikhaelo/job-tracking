/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-require-imports */
import { Sequelize, Options } from 'sequelize';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const env = process.env.NODE_ENV || 'development';

// Import config with proper typing
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

// Use dynamic import or require for config
const config: DatabaseConfig = require('../../config/config.js');
const envConfig = config[env];

let sequelize: Sequelize;

if (envConfig.use_env_variable) {
  const connectionString = process.env[envConfig.use_env_variable];
  if (!connectionString) {
    throw new Error(`Environment variable ${envConfig.use_env_variable} is not defined`);
  }
  sequelize = new Sequelize(connectionString, envConfig as Options);
} else {
  if (!envConfig.database || !envConfig.username) {
    throw new Error('Database configuration is incomplete');
  }
  
  sequelize = new Sequelize(
    envConfig.database,
    envConfig.username,
    envConfig.password || '',
    envConfig as Options
  );
}

// Test the connection
const testConnection = async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection has been established successfully.');
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
  }
};

// Initialize connection in development
if (process.env.NODE_ENV !== 'production') {
  testConnection();
}

export { sequelize, Sequelize };
export default sequelize;