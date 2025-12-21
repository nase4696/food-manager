import { AppError } from "./app-error";

type LogLevel = "debug" | "info" | "warn" | "error";

interface LogEntry {
  level: LogLevel;
  message: string;
  error?: AppError;
  context?: Record<string, unknown>;
  timestamp: string;
}

export class ErrorLogger {
  private static instance: ErrorLogger;
  private static externalLogger: ((data: LogEntry) => void) | null = null;

  private constructor() {}

  static getInstance(): ErrorLogger {
    if (!this.instance) {
      this.instance = new ErrorLogger();
    }
    return this.instance;
  }

  // 外部ロガーを登録（後でSentryを追加するときに使用）
  static registerExternalLogger(logger: (data: LogEntry) => void): void {
    this.externalLogger = logger;
  }

  log(entry: LogEntry): void {
    const { level, message, error, context, timestamp } = entry;

    const logData = {
      level,
      message,
      error: error
        ? {
            type: error.type,
            message: error.message,
            code: error.code,
            // 開発環境のみスタックトレースを出力
            stack:
              process.env.NODE_ENV === "development" ? error.stack : undefined,
          }
        : undefined,
      context,
      timestamp,
    };

    // 1. 開発環境：詳細なログをコンソールに
    if (process.env.NODE_ENV === "development") {
      const consoleMethod = console[level] || console.log;

      // エラーレベルに応じた色付け（開発環境のみ）
      const styles = {
        error: "color: #ef4444; font-weight: bold;",
        warn: "color: #f59e0b; font-weight: bold;",
        info: "color: #3b82f6;",
        debug: "color: #6b7280;",
      };

      consoleMethod(
        `%c[${level.toUpperCase()}] ${message}`,
        styles[level] || "",
        logData,
      );
    }

    // 2. 本番環境：外部ロガーがあれば使用、なければコンソール
    if (process.env.NODE_ENV === "production") {
      if (ErrorLogger.externalLogger) {
        ErrorLogger.externalLogger(entry);
      } else {
        // 外部ロガーがない場合は、エラーのみを最小限でログ
        console.error(`[${level.toUpperCase()}] ${message}`, {
          type: error?.type,
          code: error?.code,
          timestamp,
        });
      }
    }
  }
}

// エクスポートする関数（シンプルなインターフェース）
export const logError = (
  error: AppError,
  context?: Record<string, unknown>,
): void => {
  const logger = ErrorLogger.getInstance();

  logger.log({
    level: "error",
    message: `AppError: ${error.message}`,
    error,
    context,
    timestamp: new Date().toISOString(),
  });
};

export const logWarning = (
  message: string,
  context?: Record<string, unknown>,
): void => {
  const logger = ErrorLogger.getInstance();

  logger.log({
    level: "warn",
    message,
    context,
    timestamp: new Date().toISOString(),
  });
};

export const logInfo = (
  message: string,
  context?: Record<string, unknown>,
): void => {
  const logger = ErrorLogger.getInstance();

  logger.log({
    level: "info",
    message,
    context,
    timestamp: new Date().toISOString(),
  });
};
