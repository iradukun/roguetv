import { User } from "../models/user.model";


export const getRecommended = async (userId: string) => {
  try {
    let users = [];

    if (userId && userId !== "undefined") {
      users = await User.find({
        $and: [
          { _id: { $ne: userId } },
          { 'followedBy.followedById': { $ne: userId } },
          { 'blocking.blockingId': { $ne: userId } },
          { 'blockedBy.blockedById': { $ne: userId } }
        ]
      })
      .populate({
        path: 'stream',
        select: 'isLive'
      })
      .sort({ createdAt: -1 });
    } else {
      users = await User.find()
        .populate({
          path: 'stream',
          select: 'isLive'
        })
        .sort({ createdAt: -1 });
    }

    return users;
  } catch (error) {
    console.error(error);
    return [];
  }
  // // await new Promise((resolve) => setTimeout(resolve, 5000));

  // let users = [];

  // if (userId && userId !== "undefined") {
  //   users = await db.user.findMany({
  //     where: {
  //       AND: [
  //         {
  //           NOT: {
  //             id: userId,
  //           },
  //         },
  //         {
  //           NOT: {
  //             followedBy: {
  //               some: {
  //                 followedById: userId,
  //               },
  //             },
  //           },
  //         },
  //         {
  //           NOT: {
  //             blocking: {
  //               some: {
  //                 blockingId: userId,
  //               },
  //             },
  //           },
  //         },
  //         {
  //           NOT: {
  //             blockedBy: {
  //               some: {
  //                 blockedById: userId,
  //               },
  //             },
  //           },
  //         },
  //       ],
  //     },
  //     include: {
  //       stream: {
  //         select: {
  //           isLive: true,
  //         },
  //       },
  //     },
  //     orderBy: {
  //       createdAt: "desc",
  //     },
  //   });
  // } else {
  //   users = await db.user.findMany({
  //     include: {
  //       stream: {
  //         select: {
  //           isLive: true,
  //         },
  //       },
  //     },
  //     orderBy: {
  //       createdAt: "desc",
  //     },
  //   });
  // }

  // return users;
};
