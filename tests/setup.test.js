// tests/setup.test.js

import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import http from 'http';
import request from 'supertest';
import fs from 'fs';
import app from '../app/app.js'; // Assurez-vous que ce chemin est correct

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
});

describe('GET /', () => {
  it('should return status 200', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
  });
});

describe('Project Structure', () => {
  it('should have a controllers directory', () => {
    expect(fs.existsSync('./controllers')).toBe(true);
  });

  it('should have a models directory', () => {
    expect(fs.existsSync('./models')).toBe(true);
  });

  it('should have a routes directory', () => {
    expect(fs.existsSync('./routes')).toBe(true);
  });

  it('should have a tests directory', () => {
    expect(fs.existsSync('./tests')).toBe(true);
  });

  it('should have an app.js file at the root', () => {
    expect(fs.existsSync('./app/app.js')).toBe(true);
  });

  it('should have node_modules directory with dependencies', () => {
    expect(fs.existsSync('./node_modules')).toBe(true);
  });
});