import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { Server } from 'socket.io';
import http from 'http';
import './config/mongodb.js'; // MongoDB connection file
import groupRoutes from './routes/group.js';
import Group from './models/Group.js';

import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';
import influencerRoutes from './routes/influencerRoutes.js';
import blogs from './routes/blog.js';
import campaign from './routes/campaign.js';
import chatRoutes from './routes/chatRoutes.js';
import search from './routes/search.js';

import MessageModel from './models/Message.js'; // Message model
import userss from './models/user.js'; // User model
import { storage } from './config/firebase.js';
import { ref, listAll } from 'firebase/storage';
import { updateInstagramPostData } from './controllers/extracter.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000', // Frontend URL
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

app.use(cors({
  origin: 'http://localhost:5173', // Frontend URL
  credentials: true,
}));

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../dist')));

app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/api', influencerRoutes);
app.use('/influencer', blogs);
app.use('/Brand', blogs);
app.use('/Brand', campaign);
app.use('/api/users', search);
app.use('/api/messages', chatRoutes);
app.use('/api/groups', groupRoutes);


const checkFirebaseConnection = async () => {
  try {
    const storageRef = ref(storage);
    await listAll(storageRef);
    console.log('Connected to Firebase Storage');
  } catch (error) {
    console.error('Error connecting to Firebase Storage:', error);
  }
};

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

const userSocketMap = {};

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('join', async (userId) => {
    if (userId) {
      try {
        const user = await userss.findById(userId);
        if (user) {
          console.log(`User ${userId} (${user.fullName}) joined with socket ID: ${socket.id}`);

          userSocketMap[userId] = socket.id;
          socket.userId = userId;
          socket.join(userId.toString());

          io.emit('userOnline', userId); // Notify everyone the user is online
          io.emit('onlineUser', Object.keys(userSocketMap));
        } else {
          console.error(`User with ID ${userId} not found`);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    } else {
      console.error('User ID is missing');
    }
  });

  socket.on('joinGroup', (groupId) => {
    socket.join(groupId);
    console.log(`User ${socket.id} joined group ${groupId}`);
  });

  socket.on('sendGroupMessage', async ({ groupId, sender, text }) => {
    try {
      const newMessage = { sender, text, createdAt: new Date() };
      const group = await Group.findById(groupId);
      if (!group) {
        console.error(`Group ${groupId} not found`);
        return;
      }

      group.messages.push(newMessage);
      await group.save();
      io.to(groupId).emit('receiveGroupMessage', { groupId, ...newMessage });
    } catch (error) {
      console.error('Error sending group message:', error);
    }
  });

  socket.on('sendMessage', async (data) => {
    const { text, sender, receiver, chatId } = data;

    if (!chatId || !text || !sender || !receiver) {
      console.error('Message data is incomplete:', data);
      return;
    }

    console.log(`Message from ${sender} to ${receiver} (Chat ID: ${chatId}): ${text}`);

    try {
      const newMessage = new MessageModel({
        chatId,
        sender,
        receiver,
        text,
        createdAt: new Date(),
      });
      await newMessage.save();

      const receiverSocketId = userSocketMap[receiver];
      if (receiverSocketId) {
        io.to(receiverSocketId).emit('receiveMessage', newMessage);
        console.log(`Message sent to receiver ${receiver}`);
      } else {
        console.log(`User ${receiver} is offline`);
      }
    } catch (error) {
      console.error('Error saving message:', error);
    }
  });

  socket.on('leaveGroup', ({ groupId, userId }) => {
    socket.leave(groupId);
    console.log(`User ${userId} left group ${groupId}`);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    const userId = Object.keys(userSocketMap).find(id => userSocketMap[id] === socket.id);
    if (userId) {
      delete userSocketMap[userId];
      io.emit('userOffline', userId);
      io.emit('onlineUser', Object.keys(userSocketMap));
    }
  });
});

server.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  checkFirebaseConnection();
  console.log('Testing Instagram post data update...');
  try {
    await updateInstagramPostData();
  } catch (error) {
    console.error('Instagram data update test failed:', error.message);
  }
});
