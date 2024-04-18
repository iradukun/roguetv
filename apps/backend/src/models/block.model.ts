import mongoose from 'mongoose';

const blockSchema = new mongoose.Schema({
  blockingId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  blockedById: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
blockSchema.set('toJSON', {
  virtuals: true,
  versionKey:false,
  transform: function (doc, ret) {   delete ret._id  }
});
export const Block = mongoose.model('Block', blockSchema);
