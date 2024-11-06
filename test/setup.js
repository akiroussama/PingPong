const { Sequelize } = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: ':memory:', // Use in-memory SQLite for tests
  logging: false // Disable logging during tests
});

beforeAll(async () => {
  try {
    await sequelize.authenticate();
    // Sync your models here
    await sequelize.sync({ force: true });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});

afterAll(async () => {
  await sequelize.close();
}); 