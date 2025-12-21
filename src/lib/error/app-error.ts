import {
  ERROR_TYPES,
  type ErrorType,
  PRISMA_ERROR_CODES,
} from "@/constants/error";

export class AppError extends Error {
  readonly type: ErrorType;
  readonly code?: string;
  readonly context?: Record<string, unknown>;
  readonly userMessage: string;
  readonly timestamp: Date;

  constructor(options: {
    type: ErrorType;
    message: string;
    code?: string;
    context?: Record<string, unknown>;
    userMessage?: string;
  }) {
    super(options.message);
    this.name = "AppError";
    this.type = options.type;
    this.code = options.code;
    this.context = options.context;
    this.userMessage = options.userMessage || this.getDefaultUserMessage();
    this.timestamp = new Date();
  }

  private getDefaultUserMessage(): string {
    switch (this.type) {
      case ERROR_TYPES.NETWORK:
        return "ネットワーク接続に問題があります。インターネット接続を確認してください。";
      case ERROR_TYPES.DATABASE:
        return "データの読み込みに失敗しました。時間をおいて再度お試しください。";
      default:
        return "予期せぬエラーが発生しました。もう一度お試しください。";
    }
  }

  static fromUnknown(
    error: unknown,
    context?: Record<string, unknown>,
  ): AppError {
    if (error instanceof AppError) {
      return error;
    }

    if (error instanceof Error) {
      const type = AppError.classifyError(error);
      const code = AppError.extractErrorCode(error);

      return new AppError({
        type,
        message: error.message,
        code,
        context,
        userMessage: AppError.getUserMessage(type, code),
      });
    }

    return new AppError({
      type: ERROR_TYPES.UNKNOWN,
      message: String(error),
      code: "UNKNOWN_ERROR",
      context,
    });
  }

  private static classifyError(error: Error): ErrorType {
    const message = error.message.toLowerCase();

    const isDatabaseError =
      message.includes("prisma") ||
      message.includes("database") ||
      message.includes("postgres") ||
      message.includes("sql") ||
      message.includes("query");

    const isNetworkError =
      message.includes("fetch") ||
      message.includes("network") ||
      message.includes("connection") ||
      message.includes("timeout") ||
      message.includes("offline");

    if (isDatabaseError) return ERROR_TYPES.DATABASE;
    if (isNetworkError) return ERROR_TYPES.NETWORK;
    return ERROR_TYPES.UNKNOWN;
  }

  private static extractErrorCode(error: Error): string | undefined {
    const message = error.message;

    // Prismaエラーコードを抽出
    for (const [code] of Object.entries(PRISMA_ERROR_CODES)) {
      if (message.includes(code)) {
        return code;
      }
    }

    return undefined;
  }

  private static getUserMessage(type: ErrorType, code?: string): string {
    // エラーコードに基づくメッセージ（必要に応じて拡張）
    if (code && PRISMA_ERROR_CODES[code]) {
      return `データベースエラー: ${PRISMA_ERROR_CODES[code]}`;
    }

    // タイプに基づくデフォルトメッセージ
    switch (type) {
      case ERROR_TYPES.NETWORK:
        return "ネットワーク接続に問題があります。インターネット接続を確認してください。";
      case ERROR_TYPES.DATABASE:
        return "データの読み込みに失敗しました。時間をおいて再度お試しください。";
      default:
        return "予期せぬエラーが発生しました。もう一度お試しください。";
    }
  }

  // シンプルなJSON変換
  toJSON() {
    return {
      name: this.name,
      type: this.type,
      message: this.message,
      code: this.code,
      userMessage: this.userMessage,
      timestamp: this.timestamp.toISOString(),
    };
  }
}
