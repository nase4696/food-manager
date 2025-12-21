export const ERROR_TYPES = {
  NETWORK: "NETWORK",
  DATABASE: "DATABASE",
  UNKNOWN: "UNKNOWN",
} as const;

export type ErrorType = (typeof ERROR_TYPES)[keyof typeof ERROR_TYPES];

export const ERROR_TYPE_LABELS: Record<ErrorType, string> = {
  NETWORK: "ネットワークエラー",
  DATABASE: "データベースエラー",
  UNKNOWN: "不明なエラー",
} as const;

// Prismaエラーコードのマッピング
export const PRISMA_ERROR_CODES: Record<string, string> = {
  P1001: "データベース接続タイムアウト",
  P1017: "データベース接続切断",
  P2025: "データが見つかりません",
} as const;
