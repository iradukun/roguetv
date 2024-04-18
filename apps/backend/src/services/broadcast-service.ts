import { db } from "../lib/db";
import { Broadcast } from "../models/broadcast.model";

export const getBroadcasts = async (userId: string) => {
  return await Broadcast.find({
    userId,
    isComplete: true,
  }).populate("stream");
  // return await db.broadcast.findMany({
  //   where: {
  //     userId,
  //     isComplete: true,
  //   },
  //   include: {
  //     stream: true,
  //   },
  // });
};
