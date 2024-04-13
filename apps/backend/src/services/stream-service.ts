import { db } from "../lib/db";

export const getStreamByUserId = (userId: string) => {
  const stream = db.stream.findUnique({
    where: { userId: userId },
  });

  return stream;
};
