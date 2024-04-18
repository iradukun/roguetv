import { db } from "../lib/db";
import { Stream } from "../models/stream.model";


export const getStreams = async (userId: string) => {
  try {
    let streams = [];

    if (userId && userId !== "undefined") {
      streams = await Stream.find({
        user: { $nin: [userId] }
      })
        .select('id user thumbnailUrl name isLive')
        .sort({ isLive: -1, updatedAt: -1 });
    } else {
      streams = await Stream.find()
        .select('id user thumbnailUrl name isLive')
        .sort({ isLive: -1, updatedAt: -1 });
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
