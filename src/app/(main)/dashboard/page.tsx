import {
  getCategoryStats,
  getExpiryDistribution,
  getFoodsByExpiry,
} from "@/lib/food/food-data-fetcher";
import { ExpiryDistributionChart } from "@/components/dashboard/expiry-distribution-chart";
import { FoodSection } from "@/components/dashboard/food-section";
import { CategoryPieChart } from "@/features/category/components/chart/category-pie-chart";

export default async function DashboardPage() {
  const [expiryDistribution, foodLists, categoryStats] = await Promise.all([
    getExpiryDistribution(),
    getFoodsByExpiry(),
    getCategoryStats(),
  ]);

  const { expiringFoods, warningFoods, expiredFoods } = foodLists;

  const pieChartData = categoryStats
    .filter((stat) => stat.count > 0)
    .map((stat) => ({
      name: stat.name,
      value: stat.count,
      color: stat.color,
    }));

  return (
    <div className="min-h-screen p-2 md:p-6 space-y-4 md:space-y-6">
      <ExpiryDistributionChart data={expiryDistribution} />

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

      <CategoryPieChart data={pieChartData} />
    </div>
  );
}
