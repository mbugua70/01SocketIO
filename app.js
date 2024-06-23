require('dotenv').config();
const express = require('express');
const { createServer } = require('http'); // Import createServer
const { Server } = require('socket.io');
const connectDB = require('./connect');
const MessageModel = require('./model/messageModel');

const MONGODBSTRING = process.env.MONGODB_STRING;
const PORT = process.env.PORT || 4040;

const app = express();

// Middleware
app.use(express.static('./public'));

let server;

const DBserver = async () => {
  try {
    await connectDB(MONGODBSTRING);
    server = createServer(app); // Create HTTP server with Express app
    server.listen(PORT, () => {
      console.log(`Connected to the database and running on port: ${PORT}`);
    });

    const io = new Server(server, {
      connectionStateRecovery: {},
    });

    // Socket.IO connection handling
    io.on('connection', async (socket) => {
      console.log('User connected');

      // Listening to the chat message event
      socket.on('chat message', async (msg) => {
        try {
          const result = await MessageModel.create({ message: msg });
          io.emit('chat message', msg, result._id); // Emit message with its ID
        } catch (err) {
          console.error('Error creating message:', err);
        }
      });

      // Recover previous messages if needed
      if (!socket.recovered) {
        try {
          const serverOffset = socket.handshake.auth.serverOffset || 0;
          const messages = await MessageModel.find({ id: { $gt: serverOffset } });

          messages.forEach((message) => {
            socket.emit('chat message', message.content, message._id);
          });
        } catch (e) {
          console.error('Error retrieving messages:', e);
        }
      }
    });
  } catch (err) {
    console.log(err);
  }
};

DBserver();
