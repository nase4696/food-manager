import {
  getCategoryStats,
  getExpiryStatusStats,
} from "@/lib/food/food-data-fetcher";
import { StatsOverview } from "@/components/dashboard/stats-overview";
import { FoodSection } from "@/components/dashboard/food-section";
import { CategoryStats } from "@/components/dashboard/category-stats";

export default async function DashboardPage() {
  const { stats, expiringFoods, warningFoods, expiredFoods } =
    await getExpiryStatusStats();

  const categoryStats = await getCategoryStats();

  return (
    <div className="min-h-screen p-2 md:p-6">
      <StatsOverview stats={stats} />

      <FoodSection
        badgeColor="red"
        defaultExpanded={false}
        description="期限が切れている食品"
        emptyDescription="素晴らしい管理です！"
        emptyMessage="期限切れの食品はありません"
        foods={expiredFoods}
        icon="🚫"
        title="期限切れの食品"
      />

      <FoodSection
        badgeColor="orange"
        defaultExpanded={false}
        description="期限が3日以内の食品"
        emptyDescription="安心してください！"
        emptyMessage="期限間近の食品はありません"
        foods={expiringFoods}
        icon="⚠️"
        title="期限間近の食品"
      />

      <FoodSection
        badgeColor="yellow"
        defaultExpanded={false}
        description="期限が4〜7日以内の食品"
        emptyDescription="良い状態です！"
        emptyMessage="要注意の食品はありません"
        foods={warningFoods}
        icon="📋"
        title="要注意の食品"
      />

      <CategoryStats stats={categoryStats} />
    </div>
  );
}
