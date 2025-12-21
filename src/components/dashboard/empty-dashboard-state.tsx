import Link from "next/link";
import { Plus, BookOpen } from "lucide-react";

import { Button } from "@/components/ui/button";

export function EmptyDashboardState() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center space-y-6">
        {/* アイコン */}
        <div className="inline-flex items-center justify-center w-24 h-24 bg-primary/10 rounded-full">
          <span className="text-4xl">📦</span>
        </div>

        {/* メッセージ */}
        <div className="space-y-3">
          <h1 className="text-2xl font-bold text-foreground">
            食品が登録されていません
          </h1>
          <p className="text-muted-foreground">
            まずは食品を登録して、効率的な管理を始めましょう。
            賞味期限を管理することで、食品ロスを減らし、節約につながります。
          </p>
        </div>

        {/* アクションボタン */}
        <div className="space-y-3">
          <Button asChild className="w-full gap-2" size="lg">
            <Link href="/food/register">
              <Plus className="w-4 h-4" />
              食品を登録する
            </Link>
          </Button>

          <Button asChild className="w-full gap-2" size="lg" variant="outline">
            <Link href="/guide">
              <BookOpen className="w-4 h-4" />
              使い方を学ぶ
            </Link>
          </Button>
        </div>

        {/* ヒント */}
        <div className="bg-muted/30 rounded-lg p-4 mt-4">
          <p className="text-sm font-medium text-foreground mb-2">
            💡 始め方のヒント
          </p>
          <ul className="text-sm text-muted-foreground text-left space-y-1">
            <li>• 冷蔵庫にある食品をすべて登録</li>
            <li>• 賞味期限が近いものから管理</li>
            <li>• 定期的に食品リストを確認</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
