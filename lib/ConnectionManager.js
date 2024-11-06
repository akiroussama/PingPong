class Connection {
    constructor(type) {
      this.type = type;
      this.isConnected = false;
    }
  
    connect() {
      this.isConnected = true;
      console.log(`Connected to ${this.type}`);
    }
  
    disconnect() {
      this.isConnected = false;
      console.log(`Disconnected from ${this.type}`);
    }
  
    query(sql) {
      return `Executed query on ${this.type}: ${sql}`;
    }
  }
  
  class MySQLConnection extends Connection {
    constructor() {
      super('MySQL');
    }
  }
  
  class PostgreSQLConnection extends Connection {
    constructor() {
      super('PostgreSQL');
    }
  }
  
  class SQLiteConnection extends Connection {
    constructor() {
      super('SQLite');
    }
  }
  
  class ConnectionManager {
    constructor() {
      if (ConnectionManager.instance) {
        throw new Error('Cannot create multiple instances of ConnectionManager. Use ConnectionManager.getInstance()');
      }
  
      this.connections = [];
      ConnectionManager.instance = this;
    }
  
    static getInstance() {
      if (!ConnectionManager.instance) {
        ConnectionManager.instance = new ConnectionManager();
      }
      return ConnectionManager.instance;
    }
  
    createConnection(type) {
      let connection;
      switch (type) {
        case 'MySQL':
          connection = new MySQLConnection();
          break;
        case 'PostgreSQL':
          connection = new PostgreSQLConnection();
          break;
        case 'SQLite':
          connection = new SQLiteConnection();
          break;
        default:
          throw new Error(`Unsupported connection type: ${type}`);
      }
      connection.connect();
      this.connections.push(connection);
      return connection;
    }
  
    closeConnection(connection) {
      connection.disconnect();
      this.connections = this.connections.filter(conn => conn !== connection);
    }
  
    getActiveConnections() {
      return this.connections.filter(conn => conn.isConnected);
    }
  
    // Optionnel : Exposer la classe de base Connection pour les tests
    get Connection() {
      return Connection;
    }
  
    async initialize() {
      // Initialize any connections or resources needed for testing
      // This is a basic implementation - adjust based on your needs
      try {
        // Add any initialization logic here
        console.log('ConnectionManager initialized');
      } catch (error) {
        console.error('Failed to initialize ConnectionManager:', error);
        throw error;
      }
    }
  
    async cleanup() {
      // Cleanup method (already referenced in your setup.js)
      // Add cleanup logic here
    }
  }
  
  export default ConnectionManager;