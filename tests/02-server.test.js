import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import http from 'http';
import request from 'supertest';
import app from '../app/app.js';

describe('Server Setup', () => {
  let server;

  beforeAll((done) => {
    server = http.createServer(app);
    server.listen(8000, done);
  });

  afterAll((done) => {
    server.close(done);
  });

  it('should start the server without errors', () => {
    expect(server.listening).toBe(true);
  });

  it('should return status 200 for GET /', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
  });

  it("should listen on the specified port", () => {
    const PORT = process.env.PORT || 3000;
    expect(app.get('port')).toBe(PORT);
  });
}); 