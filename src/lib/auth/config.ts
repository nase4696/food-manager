import bcrypt from "bcryptjs";
import { type NextAuthConfig, type User } from "next-auth";
import type { JWT } from "next-auth/jwt";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";

import { env } from "@/env";

import { prisma } from "../prisma";

export const authConfig = {
  secret: process.env.AUTH_SECRET,
  providers: [
    Google({
      clientId: env.AUTH_GOOGLE_ID,
      clientSecret: env.AUTH_GOOGLE_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    GitHub({
      clientId: env.AUTH_GITHUB_ID,
      clientSecret: env.AUTH_GITHUB_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (
          !(
            typeof credentials?.email === "string" &&
            typeof credentials?.password === "string"
          )
        ) {
          throw new Error("正しいメールアドレスとパスワードを入力してください");
        }

        if (!credentials) return null;

        const { email, password } = credentials;
        const user = await prisma.user.findUnique({
          omit: { password: false },
          where: { email },
        });

        if (!user || !user.password) return null;

        const isPasswordValid = await bcrypt.compare(password, user.password);

        return isPasswordValid ? user : null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  trustHost: true,
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        return true;
      }

      if (!user.id) {
        return false;
      }

      const existingUser = await prisma.user.findUnique({
        omit: { password: false },
        where: { id: user.id },
      });

      if (!existingUser) {
        return false;
      }

      return true;
    },
    async jwt({ token, user }: { token: JWT; user: User }) {
      if (user) {
        token.backendToken = user.backendToken;
        token.user = user;
      }

      return token;
    },
    async session({ token, session }) {
      if (token?.sub) {
        session.user.id = token.sub;
      }
      session.backendToken = token.backendToken;
      session.user = token.user;

      return session;
    },
  },
} as const satisfies NextAuthConfig;
