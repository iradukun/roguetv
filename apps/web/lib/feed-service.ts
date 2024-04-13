import getSession from "@/actions/get-session";
import { fetcher } from "./axios";

export const getStreams = async () => {
  const session = await getSession();
  const userId = session?.user.id;
  const res = await fetcher.get(`/api/stream/${userId}`);
  const data = await res.data;
  return data;
};
