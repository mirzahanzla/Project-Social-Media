import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { Server } from 'socket.io';
import http from 'http';
import './config/mongodb.js';  // MongoDB connection file
import groupRoutes from './routes/group.js';
import Group from './models/Group.js';

import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';
import influencerRoutes from './routes/influencerRoutes.js';
import blogs from './routes/blog.js';
import campaign from './routes/campaign.js';
import chatRoutes from './routes/chatRoutes.js';
import search from './routes/search.js';

import MessageModel from './models/Message.js';  // Message model
import userss from './models/user.js';  // User model
import { storage } from './config/firebase.js';
import { ref, listAll } from 'firebase/storage';
import { updateInstagramPostData } from './controllers/extracter.js';

// Directory path setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Express and HTTP Server
const app = express();
const server = http.createServer(app);

// Initialize Socket.IO for real-time messaging
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',  // Frontend URL
        methods: ['GET', 'POST'],
        credentials: true,
    },
});

app.use(cors({
    origin: 'http://localhost:5173', // Allow requests from your frontend
    credentials: true // If you need to allow cookies or other credentials
}));

// Server port
// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../dist')));

// Routes
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/api', influencerRoutes);
app.use('/influencer', blogs);
app.use('/Brand', blogs);
app.use('/Brand', campaign);
app.use('/api/users', search);
app.use('/api/messages', chatRoutes);
app.use('/api/groups', groupRoutes);

// Firebase connection check
const checkFirebaseConnection = async () => {
    try {
        const storageRef = ref(storage);
        await listAll(storageRef);
        console.log('Connected to Firebase Storage');
    } catch (error) {
        console.error('Error connecting to Firebase Storage:', error);
    }
};

// Serve main HTML file for unmatched routes (frontend routing)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// User socket ID mapping
const userSocketMap = {};

// Socket.IO connection for real-time communication
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Handle user joining
    socket.on('join', async (userId) => {
        if (userId) {
            try {
                const user = await userss.findById(userId);
                if (user) {
                    console.log(`User ID: ${userId}, Name: ${user.fullName} has joined with socket ID: ${socket.id}`);
                    
                    userSocketMap[userId] = socket.id;  // Map user's socket ID
                    socket.userId = userId;  // Store user ID in socket session
                    socket.join(userId.toString());  // Join room for private messaging

                    // Emit user online event
                    socket.broadcast.emit('userOnline', userId);  // Notify others the user is online

                    // Emit updated online user list
                    io.emit('onlineUser', Object.keys(userSocketMap));
                } else {
                    console.error(`No user found with ID: ${userId}`);
                }
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        } else {
            console.error('User ID is missing.');
        }
    });

   // Handle user joining a group
   socket.on('joinGroup', async (groupId, userId) => {
    socket.join(groupId);
    console.log(`User ${userId} joined group ${groupId}`);
    socket.broadcast.to(groupId).emit('userJoinedGroup', { userId, groupId });
});

socket.on('sendGroupMessage', async ({ groupId, senderId, text }) => {
    try {
        // Create the message object
        const newMessage = { sender: senderId, text, createdAt: new Date() };

        // Save message to the Group in MongoDB
        const group = await Group.findById(groupId);
        if (!group) {
            console.error(`Group ${groupId} not found.`);
            return;
        }
        group.messages.push(newMessage);
        await group.save();

        // Emit message to all users in the group room
        io.to(groupId).emit('receiveGroupMessage', { groupId, ...newMessage });
    } catch (error) {
        console.error('Error sending group message:', error);
    }
});


    // Handle sending message
    socket.on('sendMessage', async (data) => {
        const { text, sender, receiver, chatId } = data;

        if (!chatId || !text || !sender || !receiver) {
            console.error('Message data is missing:', data);
            return;
        }

        console.log(`Message from sender ${sender} to receiver ${receiver} with chatId ${chatId}: ${text}`);

        try {
            // Save the message to MongoDB
            const newMessage = new MessageModel({
                chatId,
                sender,
                receiver,
                text,
                createdAt: new Date(),
            });
            await newMessage.save();

            const receiverSocketId = userSocketMap[receiver];  // Get receiver's socket ID
            if (receiverSocketId) {
                socket.to(receiver).emit('receiveMessage', newMessage);
                console.log(`Message sent to receiver ${receiver} successfully.`);
            } else {
                console.log(`User ${receiver} is not connected.`);
            }

        } catch (error) {
            console.error('Error saving message:', error);
        }
    });

    // Handle marking messages as seen
    socket.on('markAsSeen', async ({ userId, conversationWith }) => {
        try {
            await MessageModel.updateMany(
                {
                    $or: [
                        { sender: userId, receiver: conversationWith },
                        { sender: conversationWith, receiver: userId },
                    ],
                    seen: false,
                },
                { $set: { seen: true } }
            );

        } catch (error) {
            console.error('Error marking messages as seen:', error);
        }
    });

    // Handle user disconnect
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);

        const userId = Object.keys(userSocketMap).find(id => userSocketMap[id] === socket.id);
        if (userId) {
            delete userSocketMap[userId];  // Remove user from socket map
            console.log(`User ${userId} has been removed from the socket map.`);

            // Emit user offline event
            socket.broadcast.emit('userOffline', userId);  // Notify others that user is offline

            // Emit updated online users list
            io.emit('onlineUser', Object.keys(userSocketMap));
        }
    });
});

// Start the server
server.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    checkFirebaseConnection();

    // Run Instagram post data update test
    console.log("Testing Instagram post data update...");
    try {
        await updateInstagramPostData();
    } catch (error) {
        console.error('Manual test failed: ', error.message);
    }
});
