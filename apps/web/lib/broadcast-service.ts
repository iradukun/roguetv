import { getSelf } from "./auth-service";
import { fetcher } from "./axios";

export const getBroadcasts = async () => {
  const self = await getSelf();
  const res = await fetcher.get(`/api/broadcast/${self?.id}`);
  const data = await res.data;
  return data;
};
