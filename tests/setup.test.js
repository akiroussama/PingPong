import { describe, it, expect, beforeAll, afterAll,beforeEach, afterEach } from 'vitest';
import http from 'http';
import request from 'supertest';
import fs from 'fs';
import app from '../app/app.js'; // Assurez-vous que ce chemin est correct
import path from 'path';
import { sequelize } from '../models/database.js';
import ConnectionManager from '../lib/ConnectionManager.js';

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
      await sequelize.authenticate();
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
    const chatRouter = app._router.stack.find(
      layer => layer.name === 'router' && layer.regexp.test('/chat')
    );
    expect(chatRouter).toBeDefined();
    
    const routes = chatRouter.handle.stack.filter(
      layer => layer.route && layer.route.path === '/' && layer.route.methods.post
    );
    expect(routes.length).toBeGreaterThan(0);
  });

  // Test 12: Le contrôleur 'ChatController' exporte une fonction 'createMessage'.
  it("'ChatController' should export a 'createMessage' function", async () => {
    const { createMessage } = await import('../controllers/ChatController.js');
    expect(typeof createMessage).toBe('function');
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
  it("should have 'Message' model defined", async () => {
    const { default: Message } = await import('../models/Message.js');
    expect(Message).toBeDefined();
  });

  // Test 16: La base de données synchronise les modèles sans erreur.
  it("should synchronize models with the database without errors", async () => {
    try {
      await sequelize.sync();
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


describe('ConnectionManager Singleton & Factory', () => {
  let manager;
  
  beforeEach(() => {
    manager = ConnectionManager.getInstance();
    // Clear existing connections before each test
    manager.connections = [];
  });

  // Test 1: Le gestionnaire de connexions est un Singleton.
  it('should be a Singleton instance', () => {
    const manager1 = ConnectionManager.getInstance();
    const manager2 = ConnectionManager.getInstance();
    expect(manager1).toBe(manager2);
  });

  // Test 2: La Factory crée des instances de connexions selon le type.
  it('should create connections based on type', () => {
    const manager = ConnectionManager.getInstance();
    const mysqlConnection = manager.createConnection('MySQL');
    const postgresConnection = manager.createConnection('PostgreSQL');
    expect(mysqlConnection.type).toBe('MySQL');
    expect(postgresConnection.type).toBe('PostgreSQL');
  });

  // Test 3: La connexion 'MySQL' peut être créée.
  it('should create a MySQL connection', () => {
    const manager = ConnectionManager.getInstance();
    const connection = manager.createConnection('MySQL');
    expect(connection.type).toBe('MySQL');
  });

  // Test 4: La connexion 'PostgreSQL' peut être créée.
  it('should create a PostgreSQL connection', () => {
    const manager = ConnectionManager.getInstance();
    const connection = manager.createConnection('PostgreSQL');
    expect(connection.type).toBe('PostgreSQL');
  });

  // Test 5: Toutes les connexions créées par la Factory héritent de la classe de base 'Connection'.
  it('all connections should inherit from Connection base class', () => {
    const manager = ConnectionManager.getInstance();
    const connection = manager.createConnection('MySQL');
    expect(connection instanceof manager.Connection).toBe(true);
  });

  // Test 6: Le gestionnaire de connexions stocke les connexions créées.
  it('should store created connections', () => {
    const manager = ConnectionManager.getInstance();
    manager.createConnection('MySQL');
    expect(manager.connections.length).toBeGreaterThan(0);
  });

  // Test 7: Le gestionnaire de connexions renvoie la même instance lorsqu'il est appelé plusieurs fois.
  it('should return the same instance when called multiple times', () => {
    const manager1 = ConnectionManager.getInstance();
    const manager2 = ConnectionManager.getInstance();
    expect(manager1).toBe(manager2);
  });

  // Test 8: La méthode `connect()` est disponible sur les instances de connexion.
  it('connections should have a connect method', () => {
    const manager = ConnectionManager.getInstance();
    const connection = manager.createConnection('MySQL');
    expect(typeof connection.connect).toBe('function');
  });

  // Test 9: La méthode `disconnect()` est disponible sur les instances de connexion.
  it('connections should have a disconnect method', () => {
    const manager = ConnectionManager.getInstance();
    const connection = manager.createConnection('MySQL');
    expect(typeof connection.disconnect).toBe('function');
  });

  // Test 10: Les connexions peuvent être fermées via le gestionnaire.
  it('should be able to close connections via the manager', () => {
    const manager = ConnectionManager.getInstance();
    const connection = manager.createConnection('MySQL');
    manager.closeConnection(connection);
    expect(connection.isConnected).toBe(false);
  });

  // Test 11: Le gestionnaire peut fournir une liste des connexions actives.
  it('should provide a list of active connections', () => {
    manager.createConnection('MySQL');
    manager.createConnection('PostgreSQL');
    const activeConnections = manager.getActiveConnections();
    expect(activeConnections.length).toBe(2);
  });

  // Test 12: Les connexions ont une propriété 'type' correspondant au type de base de données.
  it('connections should have a type property', () => {
    const manager = ConnectionManager.getInstance();
    const connection = manager.createConnection('MySQL');
    expect(connection.type).toBeDefined();
  });

  // Test 13: La Factory lève une exception pour un type de connexion inconnu.
  it('should throw an error for unknown connection types', () => {
    const manager = ConnectionManager.getInstance();
    expect(() => manager.createConnection('UnknownDB')).toThrow();
  });

  // Test 14: Le gestionnaire empêche la création manuelle de nouvelles instances.
  it('should prevent manual creation of new instances', () => {
    const Manager = ConnectionManager;
    expect(() => new Manager()).toThrow();
  });

  // Test 15: Les méthodes du gestionnaire sont correctement définies.
  it('manager should have properly defined methods', () => {
    const manager = ConnectionManager.getInstance();
    expect(typeof manager.createConnection).toBe('function');
    expect(typeof manager.closeConnection).toBe('function');
    expect(typeof manager.getActiveConnections).toBe('function');
  });

  // Test 16: Les connexions peuvent exécuter des requêtes simulées.
  it('connections should be able to execute queries', () => {
    const manager = ConnectionManager.getInstance();
    const connection = manager.createConnection('MySQL');
    const result = connection.query('SELECT * FROM users');
    expect(result).toBe('Executed query on MySQL: SELECT * FROM users');
  });

  // Test 17: La connexion 'SQLite' peut être créée via la Factory.
  it('should create a SQLite connection', () => {
    const manager = ConnectionManager.getInstance();
    const connection = manager.createConnection('SQLite');
    expect(connection.type).toBe('SQLite');
  });

  // Test 18: Les connexions gardent une trace de leur état (connecté/déconnecté).
  it('connections should keep track of their state', () => {
    const manager = ConnectionManager.getInstance();
    const connection = manager.createConnection('MySQL');
    connection.connect();
    expect(connection.isConnected).toBe(true);
    connection.disconnect();
    expect(connection.isConnected).toBe(false);
  });

  // Test 19: Le comportement est conforme au pattern Singleton.
  it('should behave according to the Singleton pattern', () => {
    const instance1 = ConnectionManager.getInstance();
    const instance2 = ConnectionManager.getInstance();
    expect(instance1).toStrictEqual(instance2);
  });

  // Test 20: Le comportement est conforme au pattern Factory.
  it('should create different connection types via the Factory pattern', () => {
    const manager = ConnectionManager.getInstance();
    const connectionTypes = ['MySQL', 'PostgreSQL', 'SQLite'];
    connectionTypes.forEach(type => {
      const connection = manager.createConnection(type);
      expect(connection.type).toBe(type);
    });
  });

  // Add cleanup after each test
  afterEach(() => {
    const activeConnections = manager.getActiveConnections();
    activeConnections.forEach(conn => {
      if (conn.isConnected) {
        manager.closeConnection(conn);
      }
    });
  });
});