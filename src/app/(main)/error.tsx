"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Wifi, Database, AlertTriangle, RefreshCw, Home } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppError } from "@/lib/error/app-error";
import {
  ERROR_TYPES,
  type ErrorType,
  ERROR_TYPE_LABELS,
} from "@/constants/error";

const ERROR_ICONS: Record<ErrorType, React.ReactNode> = {
  [ERROR_TYPES.NETWORK]: <Wifi className="w-8 h-8" />,
  [ERROR_TYPES.DATABASE]: <Database className="w-8 h-8" />,
  [ERROR_TYPES.UNKNOWN]: <AlertTriangle className="w-8 h-8" />,
};

export default function MainLayoutError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();
  const [errorInfo, setErrorInfo] = useState<{
    type: ErrorType;
    title: string;
    description: string;
    icon: React.ReactNode;
  } | null>(null);

  useEffect(() => {
    try {
      const appError = AppError.fromUnknown(error);
      const errorType = appError.type;

      setErrorInfo({
        type: errorType,
        title: ERROR_TYPE_LABELS[errorType] || "エラーが発生しました",
        description:
          appError.userMessage ||
          "予期せぬ問題が発生しました。もう一度お試しください。",
        icon: ERROR_ICONS[errorType] || ERROR_ICONS[ERROR_TYPES.UNKNOWN],
      });

      // ✅ コンソールに詳細情報を出力（常に）
      console.error("エラー詳細:", {
        タイプ: errorType,
        メッセージ: appError.message,
        コード: appError.code,
        タイムスタンプ: new Date().toISOString(),
        スタックトレース: error.stack,
      });
    } catch (err) {
      console.error("エラーハンドリングに失敗:", err);
      setErrorInfo({
        type: ERROR_TYPES.UNKNOWN,
        title: "エラーが発生しました",
        description: "エラーの処理中に問題が発生しました。",
        icon: ERROR_ICONS[ERROR_TYPES.UNKNOWN],
      });
    }
  }, [error]);

  const handleReset = () => {
    try {
      reset();
    } catch {
      window.location.reload();
    }
  };

  if (!errorInfo) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle>エラー情報を読み込み中...</CardTitle>
          </CardHeader>
        </Card>
      </div>
    );
  }

  const isOffline =
    errorInfo.type === ERROR_TYPES.NETWORK &&
    typeof navigator !== "undefined" &&
    !navigator.onLine;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-border shadow-lg">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="p-3 rounded-full bg-destructive/10 text-destructive">
              {errorInfo.icon}
            </div>
          </div>

          <CardTitle className="text-xl">{errorInfo.title}</CardTitle>

          <p className="text-muted-foreground text-sm">
            {isOffline
              ? "オフライン状態です。インターネット接続を確認してください。"
              : errorInfo.description}
          </p>
        </CardHeader>

        <CardContent className="space-y-4">
          <Button className="w-full gap-2" onClick={handleReset} size="lg">
            <RefreshCw className="w-4 h-4" />
            再読み込み
          </Button>

          <Button
            className="w-full gap-2"
            onClick={() => router.push("/")}
            size="lg"
            variant="outline"
          >
            <Home className="w-4 h-4" />
            ホームへ戻る
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
