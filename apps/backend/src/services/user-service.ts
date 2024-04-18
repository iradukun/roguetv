import { User } from "../models/user.model";
export const getUserByUsername = async (username: string) => {
  const user = await User.findOne({ username })
    .select("id username bio imageUrl bannerUrl")
    .populate({
      path: "stream",
      select:
        "id isLive name isChatDelayed isChatEnabled isChatFollowersOnly thumbnailUrl",
    })
    .populate({
      path: "_count",
      select: "followedBy",
    });
  return user;
  //
  // const user = await db.user.findUnique({
  //   where: { username },
  //   select: {
  //     id: true,
  //     username: true,
  //     bio: true,
  //     imageUrl: true,
  //     bannerUrl: true,
  //     stream: {
  //       select: {
  //         id: true,
  //         isLive: true,
  //         name: true,
  //         isChatDelayed: true,
  //         isChatEnabled: true,
  //         isChatFollowersOnly: true,
  //         thumbnailUrl: true,
  //       },
  //     },
  //     _count: {
  //       select: {
  //         followedBy: true,
  //       },
  //     },
  //   },
  // });

  // return user;
};

export const getUserById = async (id: string) => {
  const user = await User.findById(id).populate("stream");
  return user;
  // const user = await db.user.findUnique({
  //   where: { id },
  //   include: {
  //     stream: true,
  //   },
  // });

  // return user;
};

export const updateUser = async (data: any, userId: string) => {
  const user = await User.findByIdAndUpdate(userId, data, { new: true });
  return user;
};
