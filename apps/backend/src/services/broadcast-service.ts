import { Broadcast } from "../models/broadcast.model";
import { Stream } from "../models/stream.model";

export const getBroadcasts = async (userId: string) => {
  const broadcasts = await Broadcast.find({
    userId,
    isComplete: true,
  });
  const res = [];
  for (const broadcast of broadcasts) {
    const stream = await Stream.findById(broadcast?.streamId?._id.toString());
    res.push({ ...broadcast.toJSON(), stream });
  }
  return res;
};
