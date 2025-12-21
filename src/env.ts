import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    DIRECT_URL: z.string().url(),
    AUTH_SECRET: z.string().min(32, "AUTH_SECRETは32文字以上必要です"),

    // 環境
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),

    // OAuthプロバイダー
    AUTH_GITHUB_ID: z.string().optional(),
    AUTH_GITHUB_SECRET: z.string().optional(),
    AUTH_GOOGLE_ID: z.string().optional(),
    AUTH_GOOGLE_SECRET: z.string().optional(),

    // Supabase
    SUPABASE_SERVICE_ROLE_KEY: z.string().optional(),

    // 開発用設定
    FORCE_ERROR_TYPE: z
      .enum(["", "network", "server", "database", "validation"])
      .optional(),
  },

  client: {
    // クライアントサイド設定
    NEXT_PUBLIC_SUPABASE_URL: z.string().url().optional(),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().optional(),
    NEXT_PUBLIC_ENABLE_ERROR_TESTING: z
      .enum(["true", "false"])
      .default("false"),
  },

  runtimeEnv: {
    // サーバーサイド
    DATABASE_URL: process.env.DATABASE_URL,
    DIRECT_URL: process.env.DIRECT_URL,
    AUTH_SECRET: process.env.AUTH_SECRET,
    NODE_ENV: process.env.NODE_ENV,
    AUTH_GITHUB_ID: process.env.AUTH_GITHUB_ID,
    AUTH_GITHUB_SECRET: process.env.AUTH_GITHUB_SECRET,
    AUTH_GOOGLE_ID: process.env.AUTH_GOOGLE_ID,
    AUTH_GOOGLE_SECRET: process.env.AUTH_GOOGLE_SECRET,
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
    FORCE_ERROR_TYPE: process.env.FORCE_ERROR_TYPE,

    // クライアントサイド
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_ENABLE_ERROR_TESTING:
      process.env.NEXT_PUBLIC_ENABLE_ERROR_TESTING,
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true,
});
