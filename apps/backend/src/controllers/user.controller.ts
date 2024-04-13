import { Request, Response } from "express";
import ApiError from "../errors/ApiError";
import {
  blockUser,
  getBlockedUsers,
  isBlockedByUser,
  isBlockingUser,
  unblockUser,
} from "../services/block-service";
import {
  followUser,
  getFollowedUsers,
  isFollowingUser,
  unfollowUser,
} from "../services/follow-service";
import { getUserById, getUserByUsername, updateUser } from "../services/user-service";

export const getUserByUsernameController = async (
  req: Request,
  res: Response
) => {
  try {
    const user = await getUserByUsername(req.params.username);
    res.status(200).json(user);
  } catch (error: any) {
    if (error instanceof ApiError) {
      res.status(error.status ?? 500).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

export const getUserByIdController = async (req: Request, res: Response) => {
  try {
    const user = await getUserById(req.params.id);
    res.status(200).json(user);
  } catch (error: any) {
    if (error instanceof ApiError) {
      res.status(error.status ?? 500).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

export const checkUserFollowsController = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.params.userId;
    const id = req.params.id;
    const isFollows = await isFollowingUser(id, userId);
    res.status(200).json({ value: isFollows });
  } catch (error: any) {
    if (error instanceof ApiError) {
      res.status(error.status ?? 500).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};
export const checkUserBlocksController = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.params.userId;
    const id = req.params.id;
    const isBlocks = await isBlockedByUser(id, userId);
    res.status(200).json({ value: isBlocks });
  } catch (error: any) {
    if (error instanceof ApiError) {
      res.status(error.status ?? 500).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};
export const checkUserBlockedController = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.params.userId;
    const id = req.params.id;
    const isBlocked = await isBlockingUser(id, userId);
    res.status(200).json({ value: isBlocked });
  } catch (error: any) {
    if (error instanceof ApiError) {
      res.status(error.status ?? 500).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};
export const userFollowController = async (req: Request, res: Response) => {
  try {
    const userId = req.body.userId;
    const id = req.body.id;
    const data = await followUser(id, userId);
    res.status(200).json(data);
  } catch (error: any) {
    if (error instanceof ApiError) {
      res.status(error.status ?? 500).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

export const userFollowListController = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const data = await getFollowedUsers(userId);
    res.status(200).json(data);
  } catch (error: any) {
    if (error instanceof ApiError) {
      res.status(error.status ?? 500).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};
export const userBlockListController = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const data = await getBlockedUsers(userId);
    res.status(200).json(data);
  } catch (error: any) {
    if (error instanceof ApiError) {
      res.status(error.status ?? 500).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};
export const userUnFollowController = async (req: Request, res: Response) => {
  try {
    const userId = req.body.userId;
    const id = req.body.id;
    const data = await unfollowUser(id, userId);
    res.status(200).json(data);
  } catch (error: any) {
    if (error instanceof ApiError) {
      res.status(error.status ?? 500).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};
export const userBlockController = async (req: Request, res: Response) => {
  try {
    const userId = req.body.userId;
    const id = req.body.id;
    const data = await blockUser(id, userId);
    res.status(200).json(data);
  } catch (error: any) {
    if (error instanceof ApiError) {
      res.status(error.status ?? 500).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};
export const userUnBlockController = async (req: Request, res: Response) => {
  try {
    const userId = req.body.userId;
    const id = req.body.id;
    const data = await unblockUser(id, userId);
    res.status(200).json(data);
  } catch (error: any) {
    if (error instanceof ApiError) {
      res.status(error.status ?? 500).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

export const updateUserController = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const data = req.body
  const user = await updateUser(data, userId);
  res.status(200).json(user);
  try {
  } catch (error: any) {
    if (error instanceof ApiError) {
      res.status(error.status ?? 500).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};
