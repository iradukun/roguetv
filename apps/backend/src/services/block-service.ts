import ApiError from "../errors/ApiError";
import { db } from "../lib/db";


export const isBlockedByUser = async (id: string, userId: string) => {
  try {

    const otherUser = await db.user.findUnique({
      where: { id },
    });

    if (!otherUser) {
      throw new ApiError(`User not found!`, 404);
    }

    if (otherUser.id === userId) {
      return false;
    }

    const existingBlock = await db.block.findUnique({
      where: {
        blockingId_blockedById: {
          blockingId: userId,
          blockedById: otherUser.id,
        },
      },
    });

    return !!existingBlock;
  } catch (error) {
    return false;
  }
};

export const isBlockingUser = async (id: string, userId: string) => {
  try {

    const otherUser = await db.user.findUnique({
      where: { id },
    });

    if (!otherUser) {
      throw new ApiError("User not found!", 404);
    }

    if (otherUser.id === userId) {
      return false;
    }

    const blocking = await db.block.findUnique({
      where: {
        blockingId_blockedById: {
          blockingId: id,
          blockedById: userId,
        },
      },
    });

    return !!blocking;
  } catch (error) {
    console.log(`[isBlockingUser Error]: ${error}`);
    return false;
  }
};

export const blockUser = async (id: string, userId: string) => {

  if (userId === id) {
    throw new Error("Cannot block yourself!");
  }

  const otherUser = await db.user.findUnique({
    where: { id },
  });

  if (!otherUser) {
    throw new ApiError("User not found!", 404);
  }

  const existingBlock = await db.block.findUnique({
    where: {
      blockingId_blockedById: {
        blockingId: otherUser.id,
        blockedById: userId,
      },
    },
  });

  if (existingBlock) {
    throw new ApiError(`'${otherUser.username}' is already blocked!`, 400);
  }

  const blocked = await db.block.create({
    data: {
      blockingId: otherUser.id,
      blockedById: userId,
    },
    include: {
      blocking: true,
    },
  });

  return blocked;
};

export const unblockUser = async (id: string, userId: string) => {

  if (userId === id) {
    throw new ApiError("Cannot unblock yourself!", 400);
  }

  const otherUser = await db.user.findUnique({
    where: { id },
  });

  if (!otherUser) {
    throw new ApiError("User not found!", 404);
  }

  const existingBlock = await db.block.findUnique({
    where: {
      blockingId_blockedById: {
        blockingId: otherUser.id,
        blockedById: userId,
      },
    },
  });

  if (!existingBlock) {
    throw new ApiError(`'${otherUser.username}' already unblocked!`, 400);
  }

  const unblocked = await db.block.delete({
    where: { id: existingBlock.id },
    include: {
      blocking: true,
    },
  });

  return unblocked;
};

export const getBlockedUsers = async (userId: string) => {

  const blockedUsers = await db.block.findMany({
    where: {
      blockedById: userId,
    },
    include: {
      blocking: true,
    },
  });

  return blockedUsers;
};
