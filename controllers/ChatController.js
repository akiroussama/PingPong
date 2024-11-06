// controllers/ChatController.js

import Message from '../models/Message.js';

export const createMessage = async (req, res) => {
  try {
    const { content, sender } = req.body;
    if (!content || !sender) {
      return res.status(400).json({ error: 'Content and Sender are required' });
    }
    const message = await Message.create({ content, sender });
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};