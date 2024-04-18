import { Stream } from "../models/stream.model";
import { User } from "../models/user.model";

export const getStreams = async (userId: string) => {
  try {
    let streams = [];

    if (userId && userId !== "undefined") {
      const rawStreams = await Stream.find({
        // userId: { $nin: [userId] },
      })
        .sort({ isLive: -1, updatedAt: -1 });
      for (const stream of rawStreams) {

        const user = await User.findById(stream?.userId?._id.toString());
        streams.push({
          ...stream.toJSON(),
          user,
        });
      }
    } else {
      const rawStreams = await Stream.find()
      .sort({ isLive: -1, updatedAt: -1 });
      for (const stream of rawStreams) {
        const user = await User.findById(stream?.userId?._id.toString());
        streams.push({
          ...stream.toJSON(),
          user,
        });
      }
    }

    return streams;
  } catch (error) {
    throw error;
  }
  // let streams = [];

  // if (userId.length > 0 || userId !== "undefined") {
  //   streams = await db.stream.findMany({
  //     where: {
  //       user: {
  //         NOT: {
  //           blocking: {
  //             some: {
  //               blockingId: userId,
  //             },
  //           },
  //         },
  //       },
  //     },
  //     select: {
  //       id: true,
  //       user: true,
  //       thumbnailUrl: true,
  //       name: true,
  //       isLive: true,
  //     },
  //     orderBy: [
  //       {
  //         isLive: "desc",
  //       },
  //       {
  //         updatedAt: "desc",
  //       },
  //     ],
  //   });
  // } else {
  //   streams = await db.stream.findMany({
  //     select: {
  //       id: true,
  //       user: true,
  //       thumbnailUrl: true,
  //       name: true,
  //       isLive: true,
  //     },
  //     orderBy: [
  //       {
  //         isLive: "desc",
  //       },
  //       {
  //         updatedAt: "desc",
  //       },
  //     ],
  //   });
  // }

  // return streams;
};
