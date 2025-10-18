import bcrypt from "bcryptjs";
import { type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";

import { env } from "@/env";

import { prisma } from "../prisma";

export const authConfig = {
  secret: env.AUTH_SECRET,
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
      if (account?.provider === "google" || account?.provider === "github") {
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
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ token, session }) {
      if (token.id) {
        session.user.id = token.id;
      } else if (token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
} as const satisfies NextAuthConfig;
