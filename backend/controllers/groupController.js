import Group from '../models/Group.js';
import Message from '../models/Message.js';
import mongoose from 'mongoose';
// import User from '../models/user.js';

// Create a new group
export const createGroup = async (req, res) => {
  const { title, members, photo ,admin} = req.body;

  try {
    const group = new Group({ title, members: members, photo ,admin});
    await group.save();

    res.status(201).json({ success: true, group });
  } catch (error) {
    console.error('Error creating group:', error);
    res.status(500).json({ message: 'Error creating group' });
  }
};

// Add member(s) to an existing group
export const addGroupMember = async (req, res) => {
  const { groupId, memberIds } = req.body;

  try {
    const group = await Group.findById(groupId);
    if (!group) return res.status(404).json({ message: 'Group not found' });

    group.members.push(...memberIds);
    await group.save();

    res.status(200).json({ success: true, group });
  } catch (error) {
    console.error('Error adding group member:', error);
    res.status(500).json({ message: 'Error adding group member' });
  }
};

// Fetch messages for a group
export const getGroupMessages = async (req, res) => {
  const { groupId } = req.params;

  try {
    const messages = await Message.find({ groupId }).sort({ createdAt: 1 });
    res.status(200).json(messages);
  } catch (error) {
    console.error('Error fetching group messages:', error);
    res.status(500).json({ message: 'Error fetching group messages' });
  }
};

// Send a message to a group
export const sendGroupMessage = async (req, res) => {
  const { text, sender, groupId } = req.body;

  try {
    const message = new Message({ text, sender, groupId, chatId: groupId });
    await message.save();

    // Emit the message to all group members via Socket.IO if needed
    res.status(201).json(message);
  } catch (error) {
    console.error('Error sending group message:', error);
    res.status(500).json({ message: 'Failed to send group message' });
  }
};



// Get groups for a specific admin
export const getGroups = async (req, res) => {
  const { admin } = req.params;

  // Validate if `admin` is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(admin)) {
    return res.status(400).json({ message: 'Invalid admin ID format' });
  }

  try {
    const groups = await Group.find({
      $or: [
        { admin: admin },         // Check if the user is the admin
        { members: admin }         // Check if the user is in the members array
      ]
    })

    if (groups.length === 0) {
      return res.status(404).json({ message: 'No groups found for this admin' });
    }

    console.log('Fetched groups for admin:', admin, groups);
    res.status(200).json({ groups });
  } catch (error) {
    console.error('Error fetching groups:', error);
    res.status(500).json({ message: 'Error fetching groups', error });
  }
};
// export const getuserGroup = async (req, res) => {
//   const { userId } = req.params;

//   try {
//     // Query groups where the user is either the admin or a member
//     const groups = await Group.find({
//       $or: [
//         { admin: userId },         // Check if the user is the admin
//         { members: userId }         // Check if the user is in the members array
//       ]
//     }).populate('admin members', 'fullName'); // Populate admin and members with specific fields

//     if (groups.length === 0) {
//       return res.status(404).json({ message: 'No groups found for this user' });
//     }

//     console.log('Fetched groups for user:', userId, groups);
//     res.status(200).json({ groups });
//   } catch (error) {
//     console.error('Error fetching groups:', error);
//     res.status(500).json({ message: 'Error fetching groups', error });
//   }
// };

