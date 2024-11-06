import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { ConnectionManager } from '../lib/ConnectionManager.js'; 
import { connectionManager } from './setup.js';

describe('ConnectionManager', () => {
  let testConnection;

  beforeEach(() => {
    testConnection = new ConnectionManager();
  });

  afterEach(async () => {
    await testConnection.cleanup();
  });

  it('should initialize successfully', async () => {
    await expect(testConnection.initialize()).resolves.not.toThrow();
  });

  it('should be a singleton', () => {
    const instance1 = ConnectionManager.getInstance();
    const instance2 = ConnectionManager.getInstance();
    expect(instance1).toBe(instance2);
  });

  it('should maintain active connections', async () => {
    await testConnection.initialize();
    expect(testConnection.getActiveConnections()).toBeDefined();
    expect(Array.isArray(testConnection.getActiveConnections())).toBe(true);
  });

  it('should cleanup connections properly', async () => {
    await testConnection.initialize();
    await testConnection.cleanup();
    expect(testConnection.getActiveConnections().length).toBe(0);
  });

  // Test the shared instance from setup.js
  it('should have a working shared instance', () => {
    expect(connectionManager).toBeDefined();
    expect(connectionManager instanceof ConnectionManager).toBe(true);
  });
}); 