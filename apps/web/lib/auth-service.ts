import getSession from "@/actions/get-session";
import { getUserByUsername } from "./user-service";

export const getSelf = async () => {
  const session = await getSession();
  return session?.user;
};

export const currentUser = async () => {
  const session = await getSession();
  return getSelfByUsername(session?.user.username ?? "");
};

export const getSelfByUsername = async (username: string) => {
  const session = await getSession();

  if (!session?.user || !session.user.username) {
    throw new Error("Unauthorized!");
  }

  const user = await getUserByUsername(session.user.username);

  if (!user) {
    throw new Error("User not Found!");
  }

  if (session.user.username !== session.user.username) {
    throw new Error("Unauthorized!");
  }

  return user;
};
