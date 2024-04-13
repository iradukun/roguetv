import { Request, Response } from "express";
import ApiError from "../errors/ApiError";

export const getUserByUsernameController = async (req: Request, res: Response) => {
  try {
    
  } catch (error: any) {
    if (error instanceof ApiError) {
      res.status(error.status ?? 500).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

export const checkUserFollowsController = async (req: Request, res: Response) => {
  try {
  } catch (error: any) {
    if (error instanceof ApiError) {
      res.status(error.status ?? 500).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};
export const checkUserBlocksController = async (req: Request, res: Response) => {
  try {
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
  } catch (error: any) {
    if (error instanceof ApiError) {
      res.status(error.status ?? 500).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};
