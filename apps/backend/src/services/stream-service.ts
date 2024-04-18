import { Stream } from "../models/stream.model";

export const getStreamByUserId = async (userId: string) => {
  const stream = await Stream.findOne({ userId });
  return stream;
};

export const updateStreamById = async (data: any, id: string) => {
  const stream = await Stream.findByIdAndUpdate(id, data, { new: true });
  return stream;
};

export const updateStreamByUserId = async (data: any, userId: string) => {
  const stream = await Stream.findOneAndUpdate({ userId }, data, { new: true });
  return stream;
};
