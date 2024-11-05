  // app.js

  import express from 'express';

  const app = express();

  app.get('/', (req, res) => {
    res.status(200).send('Welcome to the ChatGPT-like application!');
  });

  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

  export default app;