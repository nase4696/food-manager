import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";

import { authConfig } from "@/lib/auth/config";

import { prisma } from "./lib/prisma";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session:
    process.env.NODE_ENV === "test"
      ? { strategy: "database" }
      : { strategy: "jwt" },
  ...authConfig,
});
