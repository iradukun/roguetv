import { getServerSession } from "next-auth";

import { authOptions } from "@/config/authOptions";

export default async function getSession() {
  return await getServerSession(authOptions);
}
