"use client";

import type { FoodDisplay } from "@/types/food";
import { getDaysRemaining as getDaysRemainingUtil } from "@/lib/utils/date-utils";
import { getCategoryEmoji } from "@/constants/categories";

import { getFoodStatusStyles } from "../utils/food-utils";

interface FoodCompactCardProps {
  food: FoodDisplay;
}

export function FoodCompactCard({ food }: FoodCompactCardProps) {
  const styles = getFoodStatusStyles(food.expiryDate);

  const getDaysRemaining = (expiryDate: Date | null): string => {
    if (!expiryDate) return "期限未設定";

    const days = getDaysRemainingUtil(expiryDate);

    if (days === null) return "期限未設定";
    if (days < 0) return "期限切れ";
    if (days === 0) return "今日まで";
    return `残${days}日`;
  };

  const daysText = getDaysRemaining(food.expiryDate);

  return (
    <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-gray-200">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div aria-hidden="true" className="p-2 bg-gray-100 rounded-lg">
          <div className="text-base">
            {getCategoryEmoji(food.category.name)}
          </div>
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-gray-900 truncate text-sm">
            {food.name}
          </h3>
          <div className="flex items-center gap-2 text-xs text-gray-600 mt-1">
            <span className="flex items-center gap-1">
              <span aria-hidden="true">🏠</span>
              <span className="truncate">{food.storage.name}</span>
            </span>
            <span className="hidden sm:flex items-center gap-1">
              <span aria-hidden="true">🏷️</span>
              <span>{food.category.name}</span>
            </span>
          </div>
        </div>
      </div>
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
