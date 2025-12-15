import { PrismaClient } from "@prisma/client";

import { env } from "@/env";

function createPrismaClient() {
  return new PrismaClient({
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
    omit: {
      user: {
        password: true, // パスワードを常に除外
      },
      account: {
        refresh_token: true,
        access_token: true,
        id_token: true,
      },
    },
  });
}

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined;
};

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
