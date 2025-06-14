import { initializeDatabase } from './database';
import { getDatabase, type Database } from '../models';

let dbPromise: Promise<Database> | null = null;

/**
 * Get initialized database instance (singleton pattern)
 * This ensures database is only initialized once across the application
 */
export const getInitializedDatabase = async (): Promise<Database> => {
  if (!dbPromise) {
    dbPromise = (async () => {
      await initializeDatabase();
      return getDatabase();
    })();
  }
  return dbPromise;
};

/**
 * Helper to get specific models quickly
 */
export const getModels = async () => {
  const db = await getInitializedDatabase();
  return {
    Job: db.Job,
    // Add other models as you create them
  };
};