"use client";

import { SectionAccordion } from "@/components/dashboard/section-accordion";

import { CategoryList } from "../category-list";
import { CategoryStats } from "../category-stats";
import { TotalDisplay } from "../total-display";

import { StatsPieChart } from "./stats-pie-chart";

interface CategoryData {
  name: string;
  value: number;
  color: string;
}

interface CategoryPieChartProps {
  data: CategoryData[];
  defaultExpanded?: boolean;
}

export function CategoryPieChart({
  data,
  defaultExpanded = true,
}: CategoryPieChartProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  // データがない場合
  if (data.length === 0) {
    return (
      <SectionAccordion
        badge={{
          count: 0,
          color: "purple",
        }}
        defaultExpanded={defaultExpanded}
        description="食品のカテゴリー別分布"
        icon={<span>📊</span>}
        title="カテゴリー分布グラフ"
      >
        <div className="text-center py-6">
          <div className="text-4xl mb-3">📊</div>
          <p className="text-gray-700 font-medium">データがありません</p>
          <p className="text-gray-500 text-sm mt-1">
            食品を登録するとグラフが表示されます
          </p>
        </div>
      </SectionAccordion>
    );
  }

  // グラフ用データ
  const chartData = data.map((item) => ({
    name: item.name,
    value: item.value,
    color: item.color,
  }));

  // 最も多いカテゴリー
  const mostCommonCategory = data.reduce((max, item) =>
    item.value > max.value ? item : max,
  );

  // リスト用データ
  const categoryListItems = data.map((item) => ({
    ...item,
    percentage: ((item.value / total) * 100).toFixed(1),
  }));

  return (
    <SectionAccordion
      badge={{
        count: data.length,
        color: "purple",
      }}
      defaultExpanded={defaultExpanded}
      description="食品のカテゴリー分布を円グラフで表示"
      icon={<span>📊</span>}
      showBadge={false}
      title="カテゴリー分布"
    >
      <div className="flex flex-col gap-2 items-center">
        <div className="w-full flex flex-col sm:flex-row gap-2">
          <div className="w-full sm:w-1/2">
            <StatsPieChart data={chartData} />
          </div>
          <div className="w-full sm:w-1/2 h-[300px]">
            <CategoryList items={categoryListItems} />
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
