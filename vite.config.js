// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    sequence: {
      shuffle: false // Disable test shuffling
    },
    include: [
      // Define explicit test file order
      './tests/01-database.test.js',
      './tests/02-server.test.js',
      './tests/03-connection-manager.test.js',
      './tests/04-middleware.test.js',
      './tests/05-project-structure.test.js',
      './tests/06-chat.test.js'
    ]
  }
})