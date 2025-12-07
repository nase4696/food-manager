import { StatsPieChart } from "@/components/charts/stats-pie-chart";
import { DataList } from "@/components/charts/data-list";
import { SectionAccordion } from "@/components/ui/accordion/section-accordion";
import {
  calculateListItems,
  calculateTotal,
} from "@/lib/utils/chart-calculations";
import { EmptyState } from "@/components/charts/empty-state";

import { CategoryStats } from "../category-stats";
import { TotalDisplay } from "../total-display";
import { findMostCommonCategory } from "../../utils/category-calculations";

type CategoryPieChartProps = {
  data: Array<{ name: string; value: number; color: string }>;
  defaultExpanded?: boolean;
};

export function CategoryPieChart({
  data,
  defaultExpanded = true,
}: CategoryPieChartProps) {
  const total = calculateTotal(data);

  if (data.length === 0) {
    return (
      <SectionAccordion
        defaultExpanded={defaultExpanded}
        description="食品のカテゴリー別分布"
        icon={<span>📊</span>}
        iconBgColor="purple"
        showBadge={false}
        title="カテゴリー分布グラフ"
      >
        <EmptyState
          description="食品を登録するとグラフが表示されます"
          icon="📊"
          title="データがありません"
        />
      </SectionAccordion>
    );
  }

  const mostCommonCategory = findMostCommonCategory(data)!;

  const listItems = calculateListItems(data, total);

  return (
    <SectionAccordion
      defaultExpanded={defaultExpanded}
      description="食品のカテゴリー分布を円グラフで表示"
      icon={<span>📊</span>}
      iconBgColor="purple"
      showBadge={false}
      title="カテゴリー分布"
    >
      <div className="flex flex-col gap-2 items-center">
        <div className="w-full flex flex-col sm:flex-row gap-2">
          <div className="w-full sm:w-1/2">
            <StatsPieChart data={data} />
          </div>
          <div className="w-full sm:w-1/2 h-[300px]">
            <DataList items={listItems} title="カテゴリー詳細" />
          </div>
        </div>

        <div className="w-full">
          <CategoryStats
            categoryCount={data.length}
            mostCommonCategory={mostCommonCategory}
            totalItems={total}
          />
        </div>
      </div>

      <TotalDisplay total={total} />
    </SectionAccordion>
  );
}
