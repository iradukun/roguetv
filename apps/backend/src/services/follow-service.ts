import ApiError from "../errors/ApiError";
import { db } from "../lib/db";


export const isFollowingUser = async (id: string, userId: string) => {
  try {

    const otherUser = await db.user.findUnique({
      where: { id },
    });

    if (!otherUser) {
      throw new ApiError("User not found!", 404);
    }

    if (otherUser.id === userId) {
      return true;
    }

    const existingFollow = await db.follow.findUnique({
      where: {
        followingId_followedById: {
          followingId: otherUser.id,
          followedById: userId,
        },
      },
    });

    return !!existingFollow;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const followUser = async (id: string, userId: string) => {

  const otherUser = await db.user.findUnique({
    where: { id },
  });

  if (!otherUser) {
    throw new ApiError("User not found!", 404);
  }

  if (otherUser.id === userId) {
    throw new ApiError("Cannot follow yourself!", 400);
  }

  const existingFollow = await db.follow.findUnique({
    where: {
      followingId_followedById: {
        followingId: otherUser.id,
        followedById: userId,
      },
    },
  });

  if (existingFollow) {
    throw new ApiError("Already following this user!", 400);
  }

  const follow = await db.follow.create({
    data: {
      followingId: otherUser.id,
      followedById: userId,
    },
    include: {
      following: true,
      followedBy: true,
    },
  });

  return follow;
};

export const unfollowUser = async (id: string, userId: string) => {
  const otherUser = await db.user.findUnique({
    where: { id },
  });

  if (!otherUser) {
    throw new ApiError("User not found!", 404);
  }

  if (otherUser.id === userId) {
    throw new ApiError("Cannot unfollow yourself!", 400);
  }

  const existingFollow = await db.follow.findUnique({
    where: {
      followingId_followedById: {
        followingId: otherUser.id,
        followedById: userId,
      },
    },
  });

  if (!existingFollow) {
    throw new ApiError("Already unfollowed this user!", 400);
  }

  const follow = await db.follow.delete({
    where: {
      id: existingFollow.id,
    },
    include: {
      following: true,
    },
  });

  return follow;
};

export const getFollowedUsers = async (userId: string) => {
  try {

    const users = db.follow.findMany({
      where: {
        followedById: userId,
        following: {
          OR: [
            {
              blocking: {
                none: {
                  blockingId: userId,
                },
              },
            },
            {
              blockedBy: {
                none: {
                  blockedById: userId,
                },
              },
            },
          ],
        },
      },
      include: {
        following: {
          include: {
            stream: {
              select: {
                isLive: true,
              },
            },
          },
        },
      },
    });

    return users;
  } catch (error) {
    return [];
  }
};
