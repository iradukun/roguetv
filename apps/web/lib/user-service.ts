import { fetcher } from "./axios";

export const getUserByUsername = async (username: string) => {
  const res = await fetcher.get(
    `/api/user/username/${username}`
  );
  const user = await res.data;
  return user
};

export const getUserById = async (id: string) => {
  const res = await fetcher.get(
    `/api/user/id/${id}`
  );
  const user = await res.data;
  return user
};


export const updateUser = async (data: any, userId: string) => {
  const res = await fetcher.put(`/api/user/${userId}`, data);
  const user = await res.data;
  return user;
}
