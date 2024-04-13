import { db } from "../lib/db";


export const getRecommended = async (userId: string) => {
  // await new Promise((resolve) => setTimeout(resolve, 5000));

  let users = [];

  if (userId) {
    users = await db.user.findMany({
      where: {
        AND: [
          {
            NOT: {
              id: userId,
            },
          },
          {
            NOT: {
              followedBy: {
                some: {
                  followedById: userId,
                },
              },
            },
          },
          {
            NOT: {
              blocking: {
                some: {
                  blockingId: userId,
                },
              },
            },
          },
          {
            NOT: {
              blockedBy: {
                some: {
                  blockedById: userId,
                },
              },
            },
          },
        ],
      },
      include: {
        stream: {
          select: {
            isLive: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  } else {
    users = await db.user.findMany({
      include: {
        stream: {
          select: {
            isLive: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  return users;
};
