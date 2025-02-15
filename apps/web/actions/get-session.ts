"use server";

import { getServerSession } from "next-auth";

import { authOptions } from "@/config/authOptions";

export default async function getSession() {
  const session = await getServerSession(authOptions);
  return session;
}
