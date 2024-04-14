import { fetcher } from "./axios";

export const createDonation = async (amount: number) => {
  const res = await fetcher.post(`/api/donate`, {
    amount,
  });
  const data = await res.data;
  return data?.client_secret;
};
