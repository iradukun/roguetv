import { Stream } from "../models/stream.model";
import { User } from "../models/user.model";

export const getRecommended = async (userId: string) => {
  try {
    let users = [];

    if (userId && userId !== "undefined") {
      const rawUsers = await User.find({
        $and: [
          { _id: { $ne: userId } },
          { "followedBy.followedById": { $ne: userId } },
          { "blocking.blockingId": { $ne: userId } },
          { "blockedBy.blockedById": { $ne: userId } },
        ],
      }).sort({ createdAt: -1 });
      for (const user of rawUsers) {
        const stream = await Stream.findOne({ userId: user.id }).select(
          "isLive"
        );
        users.push({
          ...user.toJSON(),
          stream: stream,
        });
      }
    } else {
      const rawUsers = await User.find().sort({ createdAt: -1 });

      for (const user of rawUsers) {
        const stream = await Stream.findOne({ userId: user.id }).select(
          "isLive"
        );
        users.push({
          ...user.toJSON(),
          stream: stream,
        });
      }
    }

    return users;
  } catch (error) {
    console.error(error);
    return [];
  }
};
