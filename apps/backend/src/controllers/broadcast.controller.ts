import { Request, Response } from "express";
import ApiError from "../errors/ApiError";
import { getBroadcasts } from "../services/broadcast-service";

export const getBroadcastsController = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId as string;
    const broadcasts = await getBroadcasts(userId);
    res.status(200).json(broadcasts);
  } catch (error: any) {
    if (error instanceof ApiError) {
      res.status(error.status ?? 500).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};
