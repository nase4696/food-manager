import { getDashboardData } from "@/server/food/services/dashboard-service";
import { ExpiryDistributionChart } from "@/components/dashboard/expiry-distribution-chart";
import { FoodSection } from "@/components/dashboard/food-section";
import { CategoryDistributionChart } from "@/features/category/components/chart/category-distribution-chart";
import { FOOD_STATUSES_BY_PRIORITY } from "@/constants/food-status";
import { DASHBOARD_CONFIG } from "@/constants/dashboard";
import { EmptyDashboardState } from "@/components/dashboard/empty-dashboard-state";

export const dynamic = "force-dynamic";

function measurePerformance() {
  if (process.env.NODE_ENV === "development") {
    console.time("ダッシュボードページ読み込み");
    return () => console.timeEnd("ダッシュボードページ読み込み");
  }
  return () => {};
}

export default async function DashboardPage() {
  const endMeasurement = measurePerformance();

  const { foodLists, expiryDistribution, categoryDistribution, isEmpty } =
    await getDashboardData();

  endMeasurement();

  if (isEmpty) {
    return <EmptyDashboardState />;
  }

  return (
    <div className="min-h-screen p-2 md:p-6 space-y-4 md:space-y-6">
      <ExpiryDistributionChart data={expiryDistribution} />

      {FOOD_STATUSES_BY_PRIORITY.map((status) => {
        const foods = foodLists[status.id] || [];

        const shouldHide =
          DASHBOARD_CONFIG.hideEmptySections &&
          foods.length === 0 &&
          !DASHBOARD_CONFIG.alwaysShowStatuses.includes(status.id);

        if (shouldHide) return null;

        return (
          <FoodSection
            badgeColor={status.badgeColor}
            defaultExpanded={status.id === "expired" || status.id === "urgent"}
            description={status.description}
            emptyDescription={status.emptyDescription}
            emptyMessage={status.emptyMessage}
            foods={foods}
            icon={status.icon}
            key={status.id}
            title={`${status.label}の食品`}
          />
        );
      })}

      <CategoryDistributionChart data={categoryDistribution} />
    </div>
  );
}
