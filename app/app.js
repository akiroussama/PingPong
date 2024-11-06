// app.js

import express from 'express';
import bodyParser from 'body-parser';
import chatRoutes from '../routes/chat.js';
// Synchronisation de la base de données
import { sequelize as db } from '../models/database.js';

// Synchroniser les modèles
db.sync()
  .then(() => {
    console.log('Database synchronized');
  })
  .catch(err => {
    console.error('Error synchronizing database:', err);
  });

const app = express();

// Stocker le port dans l'application pour le test
const PORT = process.env.PORT || 3000;
app.set('port', PORT);

// Middleware configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.status(200).send('Welcome to the ChatGPT-like application!');
});

app.use('/chat', chatRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;