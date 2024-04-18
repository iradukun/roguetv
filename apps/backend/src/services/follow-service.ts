import ApiError from "../errors/ApiError";
import { Follow } from "../models/follow.model";
import { User } from "../models/user.model";

export const isFollowingUser = async (id: string, userId: string) => {
  try {
    const otherUser = await User.findById(id);
    if (!otherUser) {
      throw new ApiError("User not found!", 404);
    }

    if (otherUser.id === userId) {
      return true;
    }

    const existingFollow = await Follow.findOne({
      followingId: otherUser.id,
      followedById: userId,
    });

    return !!existingFollow;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const followUser = async (id: string, userId: string) => {
  try {
    const otherUser = await User.findById(id);
    if (!otherUser) {
      throw new ApiError("User not found!", 404);
    }

    if (otherUser.id === userId) {
      throw new ApiError("Cannot follow yourself!", 400);
    }

    const existingFollow = await Follow.findOne({
      followingId: otherUser.id,
      followedById: userId,
    });

    if (existingFollow) {
      throw new ApiError("Already following this user!", 400);
    }

    const follow = new Follow({
      followingId: otherUser.id,
      followedById: userId,
    });

    await follow.save();
    const following = await User.findById(otherUser.id);
    const followedBy = await User.findById(userId);
    return { ...follow, following, followedBy };
  } catch (error) {
    throw error;
  }
};

export const unfollowUser = async (id: string, userId: string) => {
  try {
    const otherUser = await User.findById(id);
    if (!otherUser) {
      throw new ApiError("User not found!", 404);
    }

    if (otherUser.id === userId) {
      throw new ApiError("Cannot unfollow yourself!", 400);
    }

    const existingFollow = await Follow.findOneAndDelete({
      followingId: otherUser.id,
      followedById: userId,
    });

    if (!existingFollow) {
      throw new ApiError("Already unfollowed this user!", 400);
    }
    const following = await User.findById(otherUser.id);
    return { ...existingFollow, following };
  } catch (error) {
    throw error;
  }
};

export const getFollowedUsers = async (userId: string) => {
  try {
    const users = await Follow.find({ followedById: userId })
      .populate({
        path: 'following',
        match: {
          $or: [
            {
              'blocking.blockingId': { $ne: userId }
            },
            {
              'blockedBy.blockedById': { $ne: userId }
            }
          ]
        },
      });
    return users;
  } catch (error) {
    return [];
  }
};
