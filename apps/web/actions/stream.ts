"use server";

import { revalidatePath } from "next/cache";

import { getSelf } from "@/lib/auth-service";
import { getStreamByUserId, updateStreamById } from "@/lib/stream-service";

export const updateStream = async (values: Partial<any>) => {
  try {
    const self = await getSelf();

    const selfStream = await getStreamByUserId(self?.id ?? "");

    if (!selfStream) {
      throw new Error("Stream not found!");
    }

    const validData = {
      thumbnailUrl: values.thumbnailUrl,
      name: values.name,
      isChatEnabled: values.isChatEnabled,
      isChatDelayed: values.isChatDelayed,
      isChatFollowersOnly: values.isChatFollowersOnly,
    };

    const stream = updateStreamById(validData, selfStream.id);

    revalidatePath(`/u/${self?.username}/chat`);
    revalidatePath(`/u/${self?.username}`);
    revalidatePath(`/${self?.username}`);

    return stream;
  } catch (error: any) {
    console.error(error.message);
    throw new Error(error.message);
  }
};
