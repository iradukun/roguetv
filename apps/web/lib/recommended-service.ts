import getSession from "@/actions/get-session";
import { fetcher } from "./axios";

export const getRecommended = async () => {
  const session = await getSession();
  const userId = session?.user.id;
  const res = await fetcher.get(`/api/stream/recommended/${userId}`);
  const data = await res.data;
  return data;
};
