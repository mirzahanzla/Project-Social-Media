import mongoose from 'mongoose';

const groupSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    admin: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Admin field
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    photo: { type: String }, // Optional: Group profile picture
    messages: [
      {
        sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        text: { type: String },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model('Group', groupSchema);
