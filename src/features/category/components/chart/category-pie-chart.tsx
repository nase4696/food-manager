"use client";

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
}

export function CategoryPieChart({ data }: CategoryPieChartProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  if (data.length === 0) {
    return (
      <section className="bg-white p-6 rounded-2xl border border-gray-200 text-center">
        <div className="text-4xl mb-3">📊</div>
        <p className="text-gray-700 font-medium">データがありません</p>
        <p className="text-gray-500 text-sm mt-1">
          食品を登録するとグラフが表示されます
        </p>
      </section>
    );
  }

  // グラフ用データを作成
  const chartData = data.map((item) => ({
    name: item.name,
    value: item.value,
    color: item.color,
  }));

  // 最も多いカテゴリーを見つける
  const mostCommonCategory = data.reduce((max, item) =>
    item.value > max.value ? item : max,
  );

  // リスト表示用データ（割合を追加）
  const categoryListItems = data.map((item) => ({
    ...item,
    percentage: ((item.value / total) * 100).toFixed(1),
  }));

  return (
    <section
      aria-labelledby="pie-chart-title"
      className="bg-white p-4 sm:p-6 rounded-2xl border border-gray-200"
    >
      <h2
        className="text-lg font-semibold mb-4 text-gray-900 sr-only"
        id="pie-chart-title"
      >
        食品カテゴリー分布グラフ
      </h2>

      {/* スクリーンリーダー用の説明 */}
      <div className="sr-only">
        <p>カテゴリー別の食品分布を円グラフで表示しています。</p>
        <ul>
          {data.map((item) => (
            <li key={item.name}>
              {item.name}: {item.value}個 (
              {((item.value / total) * 100).toFixed(1)}%)
            </li>
          ))}
        </ul>
        <p>合計{total}品の食品があります。</p>
      </div>

      {/* 改善されたレイアウト */}
      <div className="flex flex-col gap-2 items-center">
        {/* グラフとリストを横並び（大きな画面で） */}
        <div className="w-full flex flex-col sm:flex-row gap-2">
          {/* 円グラフ部分 */}
          <div className="w-full sm:w-1/2">
            <StatsPieChart data={chartData} />
          </div>

          {/* カテゴリーリスト部分 */}
          <div className="w-full sm:w-1/2 h-[300px]">
            <CategoryList items={categoryListItems} />
          </div>
        </div>

        {/* カテゴリー分析部分 */}
        <div className="w-full">
          <CategoryStats
            categoryCount={data.length}
            mostCommonCategory={mostCommonCategory}
            totalItems={total}
          />
        </div>
      </div>

      {/* 合計表示 */}
      <TotalDisplay total={total} />
    </section>
  );
}
