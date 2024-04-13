import { server_url } from "@/utils/constants";
import axios from "axios";
import type { AuthOptions, DefaultSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      username: string;
      email: string;
      first_name: string;
      last_name: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }
}

export const authOptions: AuthOptions = {
  //   adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "email",
          type: "text",
        },
        password: {
          label: "password",
          type: "password",
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password)
          throw new Error("Invalid credentials.");

        const res = await axios.post(server_url + "/api/auth/login", {
          email: credentials?.email,
          password: credentials?.password,
        });
        const user = await res.data;
        return user;
      },
    }),
  ],
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user?.id;
        //@ts-ignore
        token.username = user?.username;
      }
      return token;
    },
    async session({ session, token }) {
      //@ts-ignore
      session.user.id = token.id;
      //@ts-ignore
      session.user.username = token.username;
      return session;
    },
  },
};
