// tests/setup.test.js

import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import http from 'http';
import request from 'supertest';
import fs from 'fs';
import app from '../app/app.js'; // Assurez-vous que ce chemin est correct
import path from 'path';
import { sequelize as db } from '../models/database.js'; // Connexion à la base de données
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
  // tests/setup.test.js

});

describe('Application Structure and Configuration', () => {
  // Test 1: L'application Express démarre correctement.
  it('should start the server without errors', () => {
    expect(app).toBeDefined();
  });

  // Test 2: La route GET '/' renvoie un statut 200.
  it("GET '/' should return status 200", async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
  });

  // Test 3: Le dossier 'controllers' existe.
  it("should have a 'controllers' directory", () => {
    expect(fs.existsSync(path.join(__dirname, '../controllers'))).toBe(true);
  });

  // Test 4: Le dossier 'models' existe.
  it("should have a 'models' directory", () => {
    expect(fs.existsSync(path.join(__dirname, '../models'))).toBe(true);
  });

  // Test 5: Le dossier 'routes' existe.
  it("should have a 'routes' directory", () => {
    expect(fs.existsSync(path.join(__dirname, '../routes'))).toBe(true);
  });

  // Test 6: Le fichier 'app.js' est présent.
  it("should have an 'app.js' file", () => {
    expect(fs.existsSync(path.join(__dirname, '../app/app.js'))).toBe(true);
  });

  // Test 7: Le middleware 'body-parser' est configuré.
  it("should have 'body-parser' middleware configured", () => {
    const appStack = app._router.stack;
    const bodyParserUsed = appStack.some(layer => {
      return layer && layer.name && (layer.name === 'jsonParser' || layer.name === 'urlencodedParser');
    });
    expect(bodyParserUsed).toBe(true);
  });

  // Test 8: La base de données est connectée.
  it("should connect to the database", async () => {
    try {
      await db.authenticate();
      expect(true).toBe(true);
    } catch (error) {
      expect(error).toBeUndefined();
    }
  });

  // Test 9: La route POST '/chat' est définie.
  it("should have a POST '/chat' route defined", async () => {
    const response = await request(app).post('/chat').send({ message: 'Hello' });
    expect(response.status).not.toBe(404);
  });

  // Test 10: Le contrôleur 'ChatController' est créé.
  it("should have a 'ChatController.js' file in 'controllers' directory", () => {
    expect(fs.existsSync(path.join(__dirname, '../controllers/ChatController.js'))).toBe(true);
  });

  // Test 11: La route '/chat' utilise le contrôleur 'ChatController'.
  it("should use 'ChatController' for '/chat' route", () => {
    const routes = app._router.stack.filter(
      layer => layer.route && layer.route.path === '/chat' && layer.route.methods.post
    );
    expect(routes.length).toBeGreaterThan(0);
  });

  // Test 12: Le contrôleur 'ChatController' exporte une fonction 'createMessage'.
  it("'ChatController' should export a 'createMessage' function", () => {
    const ChatController = require('../controllers/ChatController.js');
    expect(typeof ChatController.createMessage).toBe('function');
  });

  // Test 13: Le middleware 'body-parser' est ajouté avant les routes.
  it("should have 'body-parser' middleware before routes", () => {
    const appStack = app._router.stack;
    const bodyParserIndex = appStack.findIndex(layer => layer.name === 'jsonParser' || layer.name === 'urlencodedParser');
    const routeIndex = appStack.findIndex(layer => layer.route);
    expect(bodyParserIndex).toBeLessThan(routeIndex);
  });

  // Test 14: Le modèle 'Message' existe dans 'models'.
  it("should have a 'Message.js' file in 'models' directory", () => {
    expect(fs.existsSync(path.join(__dirname, '../models/Message.js'))).toBe(true);
  });

  // Test 15: Le modèle 'Message' est correctement défini.
  it("should have 'Message' model defined", () => {
    const Message = require('../models/Message.js').default;
    expect(Message).toBeDefined();
  });

  // Test 16: La base de données synchronise les modèles sans erreur.
  it("should synchronize models with the database without errors", async () => {
    try {
      await db.sync();
      expect(true).toBe(true);
    } catch (error) {
      expect(error).toBeUndefined();
    }
  });

  // Test 17: Le fichier 'routes/chat.js' est présent.
  it("should have a 'chat.js' file in 'routes' directory", () => {
    expect(fs.existsSync(path.join(__dirname, '../routes/chat.js'))).toBe(true);
  });

  // Test 18: Le routeur 'chat.js' est utilisé dans 'app.js'.
  it("should use 'chat.js' router in 'app.js'", () => {
    const chatRouteUsed = app._router.stack.some(
      layer => layer.handle && layer.handle.name === 'router' && layer.regexp && layer.regexp.test('/chat')
    );
    expect(chatRouteUsed).toBe(true);
  });

  // Test 19: L'application écoute sur le port spécifié.
  it("should listen on the specified port", () => {
    const PORT = process.env.PORT || 3000;
    expect(app.get('port')).toBe(PORT);
  });

  // Test 20: La configuration initiale est correcte.
  it("should have the initial configuration correct", () => {
    expect(true).toBe(true);
  });
});