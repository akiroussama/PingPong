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
          throw new Error(`Unknown connection type: ${type}`);
      }
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
  }
  
  export default ConnectionManager;