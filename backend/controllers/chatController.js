import Message from '../models/Message.js';
import User from '../models/user.js';
// import SelectedChat from '../models/selectedMember.js';


// Fetch messages for a specific member
export const getMessagesByMember = async (req, res) => {
    const { member } = req.query;

    try {
        const user = await User.findOne({ fullName: member });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Fetch messages where the user is either the sender or the receiver
        const messages = await Message.find({
            $or: [
                { sender: user._id },
                { receiver: user._id }
            ]
        }).sort({ createdAt: -1 });

        if (messages.length === 0) {
            return res.status(200).json({ message: "No messages found for this user." });
        }

        return res.status(200).json(messages);
    } catch (error) {
        console.error('Error fetching messages:', error);
        return res.status(500).json({ message: 'Error fetching messages', error });
    }
};

export const getContacts = async (req, res) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            return res.status(400).json({ message: "UserId is required" });
        }

        // Find all distinct chat partners (receivers) where the user is the sender
        const messages = await Message.find({ sender: userId }).populate('receiver', 'fullName userName userType photo email');

       // Example in getContacts
const contacts = new Map();
messages.forEach(msg => {
    const { chatId, receiver } = msg;
    if (receiver) {
        contacts.set(receiver._id.toString(), {
            id: receiver._id, // or use receiver.id if applicable
            fullName: receiver.fullName,
            userName: receiver.userName,
            userType: receiver.userType,
            photo: receiver.photo,
            email: receiver.email,
            chatId
        });
    }
});


        // Convert map values to an array and send as a response
        return res.status(200).json([...contacts.values()]);

    } catch (error) {
        console.error("Error fetching contacts:", error);
        return res.status(500).json({ message: "Server error" });
    }
};





export const getMessagesByChatId = async (req, res) => {
    const { chatId } = req.params;
    const { userId } = req.query;

    try {
        const query = { chatId };
        if (userId) {
            query.$or = [{ sender: userId }, { receiver: userId }];
        }

        const messages = await Message.find(query).sort({ createdAt: 1 });
        
        if (messages.length > 0) {
            return res.status(200).json(messages);
        } else {
            // If no messages found, create an initial entry if it's a new chat
            const newChat = new Message({ chatId, participants: [userId] });
            await newChat.save();
            return res.status(201).json({ message: "New chat created, no messages yet." });
        }
    } catch (error) {
        console.error('Error retrieving messages by chatId:', error);
        return res.status(500).json({ message: 'Error retrieving messages', error });
    }
};

// const generateChatId = (userId1, userId2) => {
//     const sortedIds = [userId1, userId2].sort();
//     return `${sortedIds[0]}_${sortedIds[1]}`;
// };

// // Function to handle member selection and fetch messages
// export const handleSelectMember = async (req, res) => {
//     const { userId, selectedMemberId } = req.body;

//     try {
//         const chatId = generateChatId(userId, selectedMemberId);

//         // Save the selected member
//         await saveSelectedMember(req, res);

//         // Fetch messages by chatId
//         const messages = await Message.find({ chatId }).sort({ createdAt: 1 });
//         if (!messages || messages.length === 0) {
//             return res.status(200).json({ message: "No messages found for this user." });
//         }

//         return res.status(200).json(messages);
//     } catch (error) {
//         console.error('Error handling member selection:', error);
//         return res.status(500).json({ message: 'Error selecting member or fetching messages', error: error.message });
//     }
// };


// export const getChats = async (req, res) => {
//     const { userId } = req.body; // Ensure userId (sender) is passed in the request body
  
//     try {
//       // Step 1: Get distinct receiver IDs where the sender is userId
//       const distinctReceiverIds = await Message.distinct('receiver', { sender: userId });
  
//       if (distinctReceiverIds.length === 0) {
//         return res.status(200).json({
//           success: true,
//           contacts: [],
//         });
//       }
  
//       // Step 2: Fetch the user details (name, username, etc.) of these distinct receivers in a single query
//       const receivers = await User.find({ _id: { $in: distinctReceiverIds } })
//         .select('fullName userName email'); // Select relevant fields to return
  
//       // Step 3: Return the list of users (contacts)
//       return res.status(200).json({
//         success: true,
//         contacts: receivers,
//       });
//     } catch (error) {
//       console.error('Error retrieving contacts:', error);
//       return res.status(500).json({
//         success: false,
//         message: 'Failed to retrieve contacts',
//       });
//     }
//   };





















// // Save selected member for a specific user
// export const saveSelectedMember = async (req, res) => {
//     const { userId, selectedMemberId } = req.body;

//     try {
//         const user = await User.findById(userId);
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         const existingSelection = await SelectedChat.findOne({ userId });

//         if (existingSelection) {
//             existingSelection.selectedMember = selectedMemberId;
//             await existingSelection.save();
//         } else {
//             const newSelectedChat = new SelectedChat({
//                 userId,
//                 selectedMember: selectedMemberId,
//             });
//             await newSelectedChat.save();
//         }

//         return res.status(200).json({ message: 'Selected member saved' });
//     } catch (error) {
//         console.error('Error saving selected member:', error);
//         return res.status(500).json({ message: 'Failed to save selected member', error: error.message });
//     }
// };

// // Retrieve the saved selected member
// export const getSelectedMember = async (req, res) => {
//     const { userId } = req.params;
//     // console.log

//     try {
//         const selectedChat = await SelectedChat.findOne({ userId }).populate('selectedMember');
//         if (!selectedChat) {
//             return res.status(404).json({ message: 'No selected member found' });
//         }

//         return res.status(200).json(selectedChat.selectedMember);
//     } catch (error) {
//         console.error('Error retrieving selected member:', error);
//         return res.status(500).json({ message: 'Error retrieving selected member', error: error.message });
//     }
// };

// Function to generate a unique chatId