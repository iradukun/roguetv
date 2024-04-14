import { db } from "../lib/db";

export const getBroadcasts = async (userId: string) => {
  return await db.broadcast.findMany({
    where: {
      userId,
    },
    include: {
      stream: true,
    },
  });
};
