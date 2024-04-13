import getSession from "@/actions/get-session";
import { fetcher } from "./axios";

export const isBlockedByUser = async (id: string) => {
  try {
    const session = await getSession();
    const userId = session?.user.id;
    const res = await fetcher.get(`/api/user/blocks/${userId}/${id}`);
    const value = (await res.data) as { value: boolean };
    return value.value;
  } catch (error) {
    return false;
  }
};

export const isBlockingUser = async (id: string) => {
  try {
    const session = await getSession();
    const userId = session?.user.id;
    const res = await fetcher.get(`/api/user/blocked/${userId}/${id}`);
    const value = (await res.data) as { value: boolean };
    return value.value;
  } catch (error) {
    console.log(`[isBlockingUser Error]: ${error}`);
    return false;
  }
};

export const blockUser = async (id: string) => {
  const session = await getSession();
  const userId = session?.user.id;
  const res = await fetcher.post(`/api/user/block`, {
    userId: userId,
    id: id,
  });
  const blocked = await res.data;
  return blocked;
};

export const unblockUser = async (id: string) => {
  const session = await getSession();
  const userId = session?.user.id;
  const res = await fetcher.post(`/api/user/unblock`, {
    userId: userId,
    id: id,
  });
  const blocked = await res.data;
  return blocked;
};

export const getBlockedUsers = async () => {
  const session = await getSession();
  const userId = session?.user.id;
  const res = await fetcher.get(`/api/user/block/${userId}`);
  const data = await res.data;
  return data;
};
