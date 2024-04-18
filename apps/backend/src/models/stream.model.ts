import mongoose from 'mongoose';

const streamSchema = new mongoose.Schema({
  name: { type: String },
  thumbnailUrl: { type: String },

  ingressId: { type: String, unique: true },
  serverUrl: { type: String },
  streamKey: { type: String },

  isLive: { type: Boolean, default: false },
  isChatEnabled: { type: Boolean, default: true },
  isChatDelayed: { type: Boolean, default: false },
  isChatFollowersOnly: { type: Boolean, default: false },
  isChatSubscriberOnly: { type: Boolean, default: false },

  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },

  broadcasts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Broadcast' }],
});
streamSchema.set('toJSON', {
  virtuals: true,
  versionKey:false,
  transform: function (doc, ret) {   delete ret._id  }
});
export const Stream = mongoose.model('Stream', streamSchema);
