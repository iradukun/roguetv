import getSession from "@/actions/get-session";
import { getSelf } from "./auth-service";
import { fetcher } from "./axios";

export const createSubscription = async (username: string) => {
  const self = await getSelf();
  const res = await fetcher.post(`/api/subscription`, {
    userId: self?.id,
    username,
  });
  const data = await res.data;
  return data?.client_secret;
};

export const isSubcribedUser = async (id: string) => {
  try {
    const session = await getSession();
    const userId = session?.user.id;
    const res = await fetcher.get(`/api/subscription/${userId}/${id}`);
    const value = (await res.data) as { value: boolean };
    return value.value;
  } catch (error) {
    console.error(error);
    return false;
  }
};
