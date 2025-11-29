"use client";

import { PieChart } from "lucide-react";

import { CategoryContent } from "@/features/food/components/category-content";

import { SectionAccordion } from "./section-accordion";

interface CategoryStat {
  id: string;
  name: string;
  count: number;
  color: string;
  description: string;
}

interface CategoryStatsProps {
  stats: CategoryStat[];
}

export function CategoryStats({ stats }: CategoryStatsProps) {
  // 合計食品数を計算
  const totalItems = stats.reduce((sum, category) => sum + category.count, 0);

  return (
    <SectionAccordion
      badge={{
        count: totalItems,
        color: "purple",
      }}
      defaultExpanded={true}
      description="食品の種類ごとの分布"
      icon={<PieChart className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />}
      title="カテゴリー別内訳"
    >
      {stats.length > 0 ? (
        <CategoryContent stats={stats} totalItems={totalItems} />
      ) : (
        <div className="text-center py-6 sm:py-8">
          <div className="text-3xl sm:text-4xl mb-3">📊</div>
          <p className="text-gray-700 font-medium text-base sm:text-lg">
            まだ食品が登録されていません
          </p>
          <p className="text-gray-500 text-xs sm:text-sm mt-1">
            食品を登録するとここに統計が表示されます
          </p>
        </div>
      )}
    </SectionAccordion>
  );
}
