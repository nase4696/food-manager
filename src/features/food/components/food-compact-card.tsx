"use client";

import type { FoodDisplay } from "@/types/food";

import { getFoodStatusStyles } from "../utils/food-utils";

interface FoodCompactCardProps {
  food: FoodDisplay;
}

export function FoodCompactCard({ food }: FoodCompactCardProps) {
  const styles = getFoodStatusStyles(food.expiryDate);

  // 残り日数を計算
  const getDaysRemaining = (expiryDate: Date | null): string => {
    if (!expiryDate) return "期限未設定";

    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return "期限切れ";
    if (diffDays === 0) return "今日まで";
    return `残${diffDays}日`;
  };

  const daysText = getDaysRemaining(food.expiryDate);

  // カテゴリーに応じた絵文字
  const getCategoryEmoji = (categoryName: string): string => {
    const emojiMap: Record<string, string> = {
      野菜: "🥬",
      果物: "🍎",
      肉: "🍖",
      魚: "🐟",
      乳製品: "🥛",
      飲料: "🧃",
      調味料: "🧂",
      インスタント: "🍜",
      スイーツ: "🍰",
    };
    return emojiMap[categoryName] || "📦";
  };

  return (
    <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-gray-200">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        {/* カテゴリーアイコン */}
        <div className="p-2 bg-gray-100 rounded-lg">
          <div className="text-base">
            {getCategoryEmoji(food.category.name)}
          </div>
        </div>

        {/* 食品名とストレージ */}
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-gray-900 truncate text-sm">
            {food.name}
          </h3>
          <div className="flex items-center gap-2 text-xs text-gray-600 mt-1">
            <span className="flex items-center gap-1">
              <span>🏠</span>
              <span className="truncate">{food.storage.name}</span>
            </span>
            {/* モバイルではカテゴリー名を非表示 */}
            <span className="hidden sm:flex items-center gap-1">
              <span>🏷️</span>
              <span>{food.category.name}</span>
            </span>
          </div>
        </div>
      </div>

      {/* 残り日数バッジ */}
      <div className="shrink-0 pl-2">
        <span
          className={`text-xs font-semibold px-2 py-1 rounded-full ${styles.text} ${styles.badge}`}
        >
          {daysText}
        </span>
      </div>
    </div>
  );
}
