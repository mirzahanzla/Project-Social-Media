import express from 'express';
import {
  createGroup,
  addGroupMember,
  getGroupMessages,
  sendGroupMessage,
  getGroups,
} from '../controllers/groupController.js';

const router = express.Router();

router.post('/create', createGroup); // Create a new group
router.post('/addMember', addGroupMember); // Add member(s) to a group
router.get('/:groupId/messages', getGroupMessages); // Get messages for a specific group
router.post('/:groupId/sendMessage', sendGroupMessage); // Send a message in a group
router.get('/:admin', getGroups); // Fetch all groups

export default router;
