import mongoose from 'mongoose';

const broadcastSchema = new mongoose.Schema({
  url: { type: String },
  isComplete: { type: Boolean, default: false },

  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  streamId: { type: mongoose.Schema.Types.ObjectId, ref: 'Stream' },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

broadcastSchema.set('toJSON', {
  virtuals: true,
  versionKey:false,
  transform: function (doc, ret) {   delete ret._id  }
});
export const Broadcast = mongoose.model('Broadcast', broadcastSchema);
