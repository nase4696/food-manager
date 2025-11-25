import { getExpiryStatusStats } from "@/lib/food/food-data-fetcher";
import { StatsOverview } from "@/components/dashboard/stats-overview";
import { FoodSection } from "@/components/dashboard/food-section";

export default async function DashboardPage() {
  const { stats, expiringFoods, expiredFoods } = await getExpiryStatusStats();

  return (
    <div className="min-h-screen p-4 md:p-6 bg-gray-50">
      {/* ページヘッダー */}
      <div className="mb-8 text-center md:text-left">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          食品管理ダッシュボード
        </h1>
        <p className="text-gray-600 mt-3 text-lg">
          今日も食品ロスを減らしましょう 🍎
        </p>
      </div>

      {/* 統計概要 */}
      <StatsOverview stats={stats} />

      {/* 期限切れの食品 - デフォルトで閉じる */}
      <FoodSection
        badgeColor="red"
        defaultExpanded={false} // 追加
        description="期限が切れている食品"
        emptyDescription="素晴らしい管理です！"
        emptyMessage="期限切れの食品はありません"
        foods={expiredFoods}
        icon="🚫"
        title="期限切れの食品"
      />

      {/* 期限間近の食品 */}
      <FoodSection
        badgeColor="orange"
        defaultExpanded={false} // 追加
        description="3日以内に期限が切れる食品"
        emptyDescription="安心してください！"
        emptyMessage="期限間近の食品はありません"
        foods={expiringFoods}
        icon="⚠️"
        title="期限間近の食品"
      />
    </div>
  );
}
