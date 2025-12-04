"use client";

type CategoryStatsProps = {
  mostCommonCategory: {
    name: string;
  };
  totalItems: number;
  categoryCount: number;
};

export function CategoryStats({
  mostCommonCategory,
  totalItems,
  categoryCount,
}: CategoryStatsProps) {
  const average = Math.round(totalItems / categoryCount);

  return (
    <div className="mt-4 p-3 bg-blue-50 rounded-lg">
      <h4 className="font-semibold text-blue-900 text-sm mb-2">
        カテゴリー分析
      </h4>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
        <div className="bg-white p-2 rounded">
          <p className="text-blue-700">最多カテゴリー</p>
          <p className="font-semibold text-blue-900 truncate">
            {mostCommonCategory.name}
          </p>
        </div>
        <div className="bg-white p-2 rounded">
          <p className="text-blue-700">カテゴリー数</p>
          <p className="font-semibold text-blue-900">{categoryCount}種類</p>
        </div>
        <div className="bg-white p-2 rounded">
          <p className="text-blue-700">平均食品数</p>
          <p className="font-semibold text-blue-900">{average}個/カテゴリー</p>
        </div>
      </div>
    </div>
  );
}
