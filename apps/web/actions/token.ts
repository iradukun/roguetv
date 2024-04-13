"use server";

import { v4 } from "uuid";
import { AccessToken } from "livekit-server-sdk";
import { getSelf } from "@/lib/auth-service";
import { getUserById } from "@/lib/user-service";

import { isBlockedByUser } from "@/lib/block-service";

export const createViewerToken = async (hostIdentity: string) => {
  console.debug("[DEBUG]: createViewerToken execution start")
  let self;

  try {
    self = await getSelf();
  } catch (error) {
    const id = v4();
    const username = `guest#${Math.round(Math.random() * 10000)}`;
    self = { id, username };
  }

  const host = await getUserById(hostIdentity);

  if (!host) {
    throw new Error("Stream Host not found!");
  }

  const isBlocked = await isBlockedByUser(host.id);

  if (isBlocked) {
    throw new Error("You are blocked!");
  }

  const isHost = self?.id === host.id;

  const token = new AccessToken(
    process.env.LIVEKIT_API_KEY!,
    process.env.LIVEKIT_SECRET_KEY!,
    {
      identity: isHost ? `host-${self?.id}` : self?.id,
      name: self?.username,
    }
  );

  token.addGrant({
    room: host.id,
    roomJoin: true,
    canPublish: false,
    canPublishData: true,
  });
  console.debug("[DEBUG]: createViewerToken execution done")
  return await Promise.resolve(token.toJwt());
};
