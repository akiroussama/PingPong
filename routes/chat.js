// routes/chat.js

import express from 'express';
import { createMessage } from '../controllers/ChatController.js';

const router = express.Router();

router.post('/', createMessage);

export default router;