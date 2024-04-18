import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String },
  username: { type: String, unique: true },
  email: { type: String, unique: true },
  imageUrl: { type: String },
  bannerUrl: { type: String, default: '' },
  bio: { type: String },
  password: { type: String },

  following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Follow' }],
  followedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Follow' }],

  subscribed: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subscription' }],
  subscribedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subscription' }],

  blocking: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Block' }],
  blockedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Block' }],

  stream: { type: mongoose.Schema.Types.ObjectId, ref: 'Stream' },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },

  broadcasts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Broadcast' }],
});
userSchema.set('toJSON', {
  virtuals: true,
  versionKey:false,
  transform: function (doc, ret) {   delete ret._id  }
});
export const User = mongoose.model('User', userSchema);
