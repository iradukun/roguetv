import { fetcher } from "./axios";

export const getStreamByUserId = async (userId: string) => {
  // const session = await getSession();
  // const userId = session?.user.id;
  const res = await fetcher.get(`/api/stream/userid/${userId}`);
  const data = await res.data;
  return data;
};

export const updateStreamById = async (data: any, id: string) => {
  const res = await fetcher.put(`/api/stream/id/${id}`, data);
  const stream = await res.data;
  return stream;
};

export const updateStreamByUserId = async (data: any, userId: string) => {
  const res = await fetcher.put(`/api/stream/userid/${userId}`, data);
  const stream = await res.data;
  return stream;
};
