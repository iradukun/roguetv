import { db } from "../lib/db";
import { Stream } from "../models/stream.model";

export const getSearch = async (userId?: string, term?: string) => {
  try {
    let streams = [];

    let query: any = {
      $or: [
        { name: { $regex: term, $options: 'i' } },
        { 'user.name': { $regex: term, $options: 'i' } },
        { 'user.username': { $regex: term, $options: 'i' } }
      ]
    };

    if (userId) {
      query['user.blocking.blockingId'] = { $ne: userId };
    }

    streams = await Stream.find(query)
      .select('user id name isLive thumbnailUrl updatedAt')
      .populate('user', 'name username')
      .sort({ isLive: -1, updatedAt: -1 });

    return streams;
  } catch (error) {
    console.error(error);
    return [];
  }
  // let streams = [];

  // if (userId) {
  //   streams = await db.stream.findMany({
  //     where: {
  //       NOT: {
  //         user: {
  //           blocking: {
  //             some: {
  //               blockingId: userId,
  //             },
  //           },
  //         },
  //       },
  //       OR: [
  //         {
  //           name: {
  //             search: term,
  //           },
  //         },
  //         {
  //           user: {
  //             OR: [
  //               {
  //                 name: {
  //                   contains: term,
  //                 },
  //               },
  //               {
  //                 username: {
  //                   contains: term,
  //                 },
  //               },
  //             ],
  //           },
  //         },
  //       ],
  //     },
  //     select: {
  //       user: true,
  //       id: true,
  //       name: true,
  //       isLive: true,
  //       thumbnailUrl: true,
  //       updatedAt: true,
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
  //     where: {
  //       OR: [
  //         {
  //           name: {
  //             search: term,
  //           },
  //         },
  //         {
  //           user: {
  //             OR: [
  //               {
  //                 name: {
  //                   contains: term,
  //                 },
  //               },
  //               {
  //                 username: {
  //                   contains: term,
  //                 },
  //               },
  //             ],
  //           },
  //         },
  //       ],
  //     },
  //     select: {
  //       user: true,
  //       id: true,
  //       name: true,
  //       isLive: true,
  //       thumbnailUrl: true,
  //       updatedAt: true,
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
