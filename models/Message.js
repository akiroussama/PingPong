// models/Message.js

import { DataTypes } from 'sequelize';
import { sequelize } from './database.js';

const Message = sequelize.define('Message', {
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  sender: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

export default Message;