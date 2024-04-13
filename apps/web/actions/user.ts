"use server";

import { getSelf } from "@/lib/auth-service";
import { updateUserByUserId } from "@/lib/user-service";

import { revalidatePath } from "next/cache";

export const updateUser = async (values: Partial<any>) => {
  try {
    const self = await getSelf();

    const validData = {
      bio: values.bio,
    };

    const user = await updateUserByUserId(validData, self?.id ?? "");

    revalidatePath(`/u/${self?.username}`);
    revalidatePath(`/${self?.username}`);

    return user;
  } catch (error: any) {
    console.error(`[updateUser ERROR]: ${error}`);
    throw new Error(error.message);
  }
};
