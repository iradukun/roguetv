import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema({
  subscriptionId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  subscriptionById: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

  isExpired: { type: Boolean, default: false },
  isActive: { type: Boolean, default: false },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
subscriptionSchema.set('toJSON', {
  virtuals: true,
  versionKey:false,
  transform: function (doc, ret) {   delete ret._id  }
});
export const Subscription = mongoose.model('Subscription', subscriptionSchema);


