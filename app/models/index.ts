/* eslint-disable @typescript-eslint/no-unused-vars */
import { Sequelize } from 'sequelize';
import { getSequelize } from '../lib/database';

// Import model classes
import { Job } from './Job';
// Add other models here as you create them
// import { User } from './User';
// import { Company } from './Company';

// Database interface for type safety
export interface Database {
  sequelize: Sequelize;
  Job: typeof Job;
  // Add other models here
  // User: typeof User;
  // Company: typeof Company;
}

let db: Database | null = null;

/**
 * Initialize all models with Sequelize instance
 */
const initializeModels = (): Database => {
  const sequelize = getSequelize();
  
  // Initialize all models
  Job.initModel(sequelize);
  // Add other model initializations here
  // User.initModel(sequelize);
  // Company.initModel(sequelize);

  return {
    sequelize,
    Job,
    // User,
    // Company,
  };
};

/**
 * Set up model associations
 */
const setupAssociations = (database: Database): void => {
  // Add associations here when you have them
  // Example:
  // database.Job.associate?.(database);
  // database.User.associate?.(database);
};

/**
 * Get initialized database with all models
 */
export const getDatabase = (): Database => {
  if (!db) {
    db = initializeModels();
    setupAssociations(db);
  }
  return db;
};

// Export individual models for direct import (recommended)
export { Job };
// export { User };
// export { Company };

// Export Sequelize for type definitions
export { Sequelize };

// Default export for compatibility
export default getDatabase;