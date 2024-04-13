import getSession from "@/actions/get-session";
import { fetcher } from "./axios";

export const getSearch = async (term?: string) => {
  const session = await getSession();
  const userId = session?.user.id;
  const res = await fetcher.get(
    "/api/stream/search?term=" + term + "&userId=" + userId
  );
  const streams = await res.data;
  return streams;
};
