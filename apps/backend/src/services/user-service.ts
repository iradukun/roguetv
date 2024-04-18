import { Follow } from "../models/follow.model";
import { Stream } from "../models/stream.model";
import { User } from "../models/user.model";
export const getUserByUsername = async (username: string) => {
  const user = await User.findOne({ username }).select(
    "id username bio imageUrl bannerUrl"
  );
  const stream = await Stream.findOne({ userId: user?.id });
  const _count = await Follow.find({ followingId: user?.id }).countDocuments();
  return { ...user?.toJSON(), _count: { followedBy: _count }, stream };
};

export const getUserById = async (id: string) => {
  const user = await User.findById(id);
  const stream = await Stream.findOne({ userId: user?.id });
  return { ...user?.toJSON(), stream };
};

export const updateUser = async (data: any, userId: string) => {
  const user = await User.findByIdAndUpdate(userId, data, { new: true });
  return user;
};
