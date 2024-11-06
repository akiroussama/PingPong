// models/database.js

import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite' // Fichier de base de données SQLite
});

export { sequelize };   