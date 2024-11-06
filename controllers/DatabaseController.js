import ConnectionManager from '../lib/ConnectionManager.js';

export const performDatabaseOperation = (req, res) => {
  try {
    const manager = ConnectionManager.getInstance();
    const connection = manager.createConnection('MySQL'); // ou un autre type
    connection.connect();
    const result = connection.query('SELECT * FROM users');
    connection.disconnect();
    manager.closeConnection(connection);

    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};