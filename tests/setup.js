import { beforeAll, afterAll } from 'vitest';
import { sequelize } from '../models/database.js';
import { ConnectionManager } from '../lib/ConnectionManager.js'; 
import http from 'http';
import app from '../app/app.js';

export const testServer = {
  instance: null,
};

export const connectionManager = new ConnectionManager();

beforeAll(async () => {
  console.log('🚀 Starting test environment setup...');
  
  // 1. Initialize ConnectionManager
  try {
    console.log('🔌 Initializing ConnectionManager...');
    await connectionManager.initialize();
    console.log('✅ ConnectionManager initialized');
  } catch (error) {
    console.error('❌ ConnectionManager initialization failed:', error);
    throw error;
  }

  // 2. Database setup
  try {
    console.log('📦 Connecting to database...');
    await sequelize.authenticate();
    await sequelize.sync({ force: true });
    console.log('✅ Database connected and synced');
  } catch (error) {
    console.error('❌ Database setup failed:', error);
    throw error;
  }

  // 3. Server setup
  return new Promise((resolve) => {
    console.log('🌐 Starting test server...');
    testServer.instance = http.createServer(app);
    testServer.instance.listen(8000, () => {
      console.log('✅ Test server started on port 8000');
      resolve();
    });
  });
});

afterAll(async () => {
  console.log('🧹 Starting cleanup...');
  
  // 1. Close server
  await new Promise((resolve) => {
    if (testServer.instance) {
      testServer.instance.close(() => {
        console.log('✅ Test server closed');
        resolve();
      });
    } else {
      resolve();
    }
  });

  // 2. Close database
  try {
    await sequelize.close();
    console.log('✅ Database connection closed');
  } catch (error) {
    console.error('❌ Error closing database:', error);
  }

  // 3. Cleanup ConnectionManager
  try {
    await connectionManager.cleanup();
    console.log('✅ ConnectionManager cleaned up');
  } catch (error) {
    console.error('❌ Error cleaning up ConnectionManager:', error);
  }
}); 