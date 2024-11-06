import { describe, it, expect } from 'vitest';
import { sequelize } from '../models/database.js';

describe('Database', () => {
  it("should connect to the database", async () => {
    try {
      await sequelize.authenticate();
      expect(true).toBe(true);
    } catch (error) {
      expect(error).toBeUndefined();
    }
  });

  it("should have 'Message' model defined", async () => {
    const { default: Message } = await import('../models/Message.js');
    expect(Message).toBeDefined();
  });

  it("should synchronize models with the database without errors", async () => {
    try {
      await sequelize.sync();
      expect(true).toBe(true);
    } catch (error) {
      expect(error).toBeUndefined();
    }
  });
}); 