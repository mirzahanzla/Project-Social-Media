import express from 'express';
import { getMessagesByMember, getMessagesByChatId, getContacts } from '../controllers/chatController.js';

const router = express.Router();


// Route to get messages by member
router.get('/messages', getMessagesByMember);
router.get('/chat/:chatId', getMessagesByChatId);
router.get('/messages/contacts/:userId', getContacts); // Add this route for fetching by chatId


export default router;
