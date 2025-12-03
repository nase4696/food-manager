"use client";

import { getCategoryEmoji, getCategoryColor } from "@/constants/categories";

type CategoryContentProps = {
  stats: Array<{
    id: string;
    name: string;
    count: number;
    color: string;
    description: string;
  }>;
  totalItems: number;
};

export function CategoryContent({ stats, totalItems }: CategoryContentProps) {
  // 割合を計算（%）
  const getPercentage = (count: number) => {
    if (totalItems === 0) return 0;
    return Math.round((count / totalItems) * 100);
  };

  const filteredAndSortedStats = stats
    .filter((category) => category.count > 0)
    .sort((a, b) => b.count - a.count);

  return (
    <div className="space-y-3 sm:space-y-4">
      {filteredAndSortedStats.map((category) => {
        const percentage = getPercentage(category.count);
        // 一元化した関数を使用
        const emoji = getCategoryEmoji(category.name);
        const color = category.color || getCategoryColor(category.name);

        return (
          <div
            className="group relative bg-white rounded-xl border border-gray-200 p-3 sm:p-4 hover:shadow-md transition-all duration-300 hover:border-gray-300"
            key={category.id}
            style={{
              background: `linear-gradient(90deg, ${color}20 ${percentage}%, transparent ${percentage}%)`,
              borderLeftColor: color,
              borderLeftWidth: "4px",
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                {/* カテゴリー絵文字 */}
                <div
                  className="p-2 sm:p-3 rounded-xl text-base sm:text-lg transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: `${color}20` }}
                >
                  {emoji}
                </div>

                {/* カテゴリー情報 */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <h3 className="font-semibold text-gray-900 text-sm sm:text-base truncate">
                      {category.name}
                    </h3>
                    <span
                      className="text-xs font-medium px-2 py-1 rounded-full text-white shrink-0"
                      style={{ backgroundColor: color }}
                    >
                      {category.count}個
                    </span>
                  </div>
                  {category.description && (
                    <p className="text-xs sm:text-sm text-gray-600 mt-1 truncate">
                      {category.description}
                    </p>
                  )}
                </div>
              </div>

              {/* 割合表示 */}
              <div className="text-right shrink-0 ml-2 sm:ml-4">
                <div className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
                  {percentage}%
                </div>
                <div className="text-xs text-gray-500 mt-1 hidden sm:block">
                  全体の割合
                </div>
              </div>
            </div>

            {/* プログレスバー（モバイル用） */}
            <div className="mt-2 sm:mt-3 md:hidden">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="h-2 rounded-full transition-all duration-500 ease-out"
                  style={{
                    width: `${percentage}%`,
                    backgroundColor: color,
                  }}
                />
              </div>
            </div>
          </div>
        );
      })}

      {/* 合計表示 */}
      <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-gray-200">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600">全カテゴリー合計</span>
          <span className="font-semibold text-gray-900">
            {totalItems}品の食品
          </span>
        </div>
      </div>
    </div>
  );
}
