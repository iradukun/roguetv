import { Request, Response } from "express";
import ApiError from "../errors/ApiError";
import { getStreams } from "../services/feed-service";
import { getSearch } from "../services/search-service";
import { getStreamByUserId } from "../services/stream-service";

export const streamSearchController = async (req: Request, res: Response) => {
  try {
    const userId = req.query?.userId as string | undefined;
    const term = req.query?.term as string | undefined;
    const streams = await getSearch(userId, term);
    res.status(200).json(streams);
  } catch (error: any) {
    if (error instanceof ApiError) {
      res.status(error.status ?? 500).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

export const getStreamByUserController = async (
  req: Request,
  res: Response
) => {
  const userId = req.params.userId;
  const streams = await getStreamByUserId(userId);
  res.status(200).json(streams);
  try {
  } catch (error: any) {
    if (error instanceof ApiError) {
      res.status(error.status ?? 500).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

export const getStreamsController = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const streams = await getStreams(userId);
  res.status(200).json(streams);
  try {
  } catch (error: any) {
    if (error instanceof ApiError) {
      res.status(error.status ?? 500).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};
