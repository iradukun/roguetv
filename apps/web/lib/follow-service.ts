import { getSession } from "next-auth/react";
import { fetcher } from "./axios";

export const isFollowingUser = async (id: string) => {
  try {
    const session = await getSession();
    const userId = session?.user.id;
    const res = await fetcher.get(`/api/user/follows/${userId}/${id}`);
    const value = (await res.data) as { value: boolean };
    return value.value;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const followUser = async (id: string) => {
  const session = await getSession();
  const userId = session?.user.id;
  const res = await fetcher.post(`/api/user/follow`, {
    userId: userId,
    id: id,
  });
  const blocked = await res.data;
  return blocked;
};

export const unfollowUser = async (id: string) => {
  const session = await getSession();
  const userId = session?.user.id;
  const res = await fetcher.post(`/api/user/unfollow`, {
    userId: userId,
    id: id,
  });
  const blocked = await res.data;
  return blocked;
};

export const getFollowedUsers = async () => {
  try {
    const session = await getSession();
    const userId = session?.user.id;
    const res = await fetcher.get(`/api/user/follow/${userId}`);
    const data = await res.data;
    return data;
  } catch (error) {
    return [];
  }
};
