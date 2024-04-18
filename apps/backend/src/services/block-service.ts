import ApiError from "../errors/ApiError";
import { Block } from "../models/block.model";
import { User } from "../models/user.model";

export const isBlockedByUser = async (id: string, userId: string) => {
  try {
    const otherUser = await User.findById(id);
    if (!otherUser) {
      throw new ApiError(`User not found!`, 404);
    }

    if (otherUser.id === userId) {
      return false;
    }

    const existingBlock = await Block.findOne({
      blockingId: userId,
      blockedById: otherUser.id,
    });

    return !!existingBlock;
  } catch (error) {
    console.error(`[isBlockedByUser Error]: ${error}`);
    return false;
  }
};

export const isBlockingUser = async (id: string, userId: string) => {
  try {
    const otherUser = await User.findById(id);
    if (!otherUser) {
      throw new ApiError("User not found!", 404);
    }

    if (otherUser.id === userId) {
      return false;
    }

    const blocking = await Block.findOne({
      blockingId: id,
      blockedById: userId,
    });

    return !!blocking;
  } catch (error) {
    console.error(`[isBlockingUser Error]: ${error}`);
    return false;
  }
};

export const blockUser = async (id: string, userId: string) => {
  try {
    if (userId === id) {
      throw new Error("Cannot block yourself!");
    }

    const otherUser = await User.findById(id);
    if (!otherUser) {
      throw new ApiError("User not found!", 404);
    }

    const existingBlock = await Block.findOne({
      blockingId: otherUser.id,
      blockedById: userId,
    });

    if (existingBlock) {
      throw new ApiError(`'${otherUser.username}' is already blocked!`, 400);
    }

    const blocked = new Block({
      blockingId: otherUser.id,
      blockedById: userId,
    });

    await blocked.save();
    const blocking = await User.findById(otherUser.id);
    return {
      ...blocked,
      blocking: blocking,
    };
  } catch (error) {
    throw error;
  }
};

export const unblockUser = async (id: string, userId: string) => {
  try {
    if (userId === id) {
      throw new ApiError("Cannot unblock yourself!", 400);
    }

    const otherUser = await User.findById(id);
    if (!otherUser) {
      throw new ApiError("User not found!", 404);
    }

    const existingBlock = await Block.findOneAndDelete({
      blockingId: otherUser.id,
      blockedById: userId,
    });

    if (!existingBlock) {
      throw new ApiError(`'${otherUser.username}' already unblocked!`, 400);
    }

    const blocking = await User.findById(otherUser.id);
    return {
      ...existingBlock,
      blocking: blocking,
    };
  } catch (error) {
    throw error;
  }
};

export const getBlockedUsers = async (userId: string) => {
  const blockedUsers = await Block.find({ blockedById: userId });
  const res = [];
  for (const blockedUser of blockedUsers) {
    const blocking = await User.findById(
      blockedUser?.blockedById?._id.toString()
    );
    res.push({ ...blockedUser.toJSON(), blocking });
  }
  return blockedUsers;
};
