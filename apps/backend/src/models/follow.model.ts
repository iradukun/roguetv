import mongoose from 'mongoose';

const followSchema = new mongoose.Schema({
  followingId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  followedById: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
followSchema.set('toJSON', {
  virtuals: true,
  versionKey:false,
  transform: function (doc, ret) {   delete ret._id  }
});
export const Follow = mongoose.model('Follow', followSchema);
