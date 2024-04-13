import { db } from "../lib/db";

export const getSearch = async (userId?: string, term?: string) => {

  let streams = [];

  if (userId) {
    streams = await db.stream.findMany({
      where: {
        NOT: {
          user: {
            blocking: {
              some: {
                blockingId: userId,
              },
            },
          },
        },
        OR: [
          {
            name: {
              search: term,
            },
          },
          {
            user: {
              OR: [
                {
                  name: {
                    contains: term,
                  },
                },
                {
                  username: {
                    contains: term,
                  },
                },
              ],
            },
          },
        ],
      },
      select: {
        user: true,
        id: true,
        name: true,
        isLive: true,
        thumbnailUrl: true,
        updatedAt: true,
      },
      orderBy: [
        {
          isLive: "desc",
        },
        {
          updatedAt: "desc",
        },
      ],
    });
  } else {
    streams = await db.stream.findMany({
      where: {
        OR: [
          {
            name: {
              search: term,
            },
          },
          {
            user: {
              OR: [
                {
                  name: {
                    contains: term,
                  },
                },
                {
                  username: {
                    contains: term,
                  },
                },
              ],
            },
          },
        ],
      },
      select: {
        user: true,
        id: true,
        name: true,
        isLive: true,
        thumbnailUrl: true,
        updatedAt: true,
      },
      orderBy: [
        {
          isLive: "desc",
        },
        {
          updatedAt: "desc",
        },
      ],
    });
  }

  return streams;
};
