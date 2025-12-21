import Link from "next/link";
import { Home, Search, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function DashboardNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="inline-flex items-center justify-center w-24 h-24 bg-muted rounded-full">
          <Search className="w-12 h-12 text-muted-foreground" />
        </div>

        <div className="space-y-3">
          <h1 className="text-2xl font-bold text-foreground">
            ページが見つかりません
          </h1>
          <p className="text-muted-foreground">
            お探しのダッシュボードページは存在しないか、移動した可能性があります。
          </p>
        </div>

        <div className="space-y-3">
          <Button asChild className="w-full gap-2" size="lg">
            <Link href="/dashboard">
              <Home className="w-4 h-4" />
              ダッシュボードトップへ
            </Link>
          </Button>

          <Button asChild className="w-full gap-2" size="lg" variant="outline">
            <Link href="/food/register">
              <Plus className="w-4 h-4" />
              新規食品登録へ
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
