import { describe, it, expect } from 'vitest';
import request from 'supertest';
import fs from 'fs';
import path from 'path';
import app from '../app/app.js';

describe('Chat Functionality', () => {
  it("should have a POST '/chat' route defined", async () => {
    const response = await request(app).post('/chat').send({ message: 'Hello' });
    expect(response.status).not.toBe(404);
  });

  it("should have a 'ChatController.js' file", () => {
    expect(fs.existsSync(path.join(__dirname, '../controllers/ChatController.js'))).toBe(true);
  });

  it("should use 'ChatController' for '/chat' route", () => {
    const chatRouter = app._router.stack.find(
      layer => layer.name === 'router' && layer.regexp.test('/chat')
    );
    expect(chatRouter).toBeDefined();
    
    const routes = chatRouter.handle.stack.filter(
      layer => layer.route && layer.route.path === '/' && layer.route.methods.post
    );
    expect(routes.length).toBeGreaterThan(0);
  });

  it("'ChatController' should export a 'createMessage' function", async () => {
    const { createMessage } = await import('../controllers/ChatController.js');
    expect(typeof createMessage).toBe('function');
  });
}); 