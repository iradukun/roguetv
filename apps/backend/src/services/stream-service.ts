import { db } from "../lib/db";

export const getStreamByUserId = (userId: string) => {
  const stream = db.stream.findUnique({
    where: { userId: userId },
  });

  return stream;
};

export const updateStreamById = async (data: any, id: string) => {
  const stream = await db.stream.update({
    where: { id },
    data: {
      ...data,
    },
  });

  return stream;
};

export const updateStreamByUserId = async (data: any, userId: string) => {
  const stream = await db.stream.update({
    where: { userId: userId },
    data: {
      ...data,
    },
  });

  return stream;
};
