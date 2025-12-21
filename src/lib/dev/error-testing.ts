import { env } from "@/env";
import { ERROR_TYPES } from "@/constants/error";
import { AppError } from "@/lib/error/app-error";

export const ErrorTestingService = {
  throwForcedErrorIfNeeded(): void {
    if (env.NODE_ENV !== "development") return;
    if (env.NEXT_PUBLIC_ENABLE_ERROR_TESTING !== "true") return;

    const forceErrorType = env.FORCE_ERROR_TYPE;
    if (!forceErrorType) return;

    console.log(`🔧 [開発環境] 強制エラー発生: ${forceErrorType}`);

    if (forceErrorType === "database") {
      throw new AppError({
        type: ERROR_TYPES.DATABASE,
        message: "Database error: 開発環境テスト",
        code: "TEST_DATABASE_ERROR",
        context: { testType: "forced_database_error" },
        userMessage: "データベース接続のテスト中にエラーが発生しました。",
      });
    }

    if (forceErrorType === "network") {
      throw new AppError({
        type: ERROR_TYPES.NETWORK,
        message: "Network error: 開発環境テスト",
        code: "TEST_NETWORK_ERROR",
        context: { testType: "forced_network_error" },
        userMessage: "ネットワーク接続のテスト中にエラーが発生しました。",
      });
    }
  },

  async simulateDelay(ms: number = 1000): Promise<void> {
    if (env.NODE_ENV !== "development") return;
    await new Promise((resolve) => setTimeout(resolve, ms));
  },
};
