export const FOOD_STATUS = {
  expired: {
    id: "expired",
    label: "期限切れ",
    shortLabel: "期限切れ",
    description: "期限が切れている食品",
    icon: "🚫",
    badgeColor: "red",
    chartColor: "#ef5350",
    daysRange: { min: -Infinity, max: -1 },
    priority: 0,
    emptyMessage: "期限切れの食品はありません",
    emptyDescription: "素晴らしい管理です！",
  },

  urgent: {
    id: "urgent",
    label: "3日以内",
    shortLabel: "3日以内",
    description: "期限が3日以内の食品",
    icon: "⚠️",
    badgeColor: "orange",
    chartColor: "#ff9800",
    daysRange: { min: 0, max: 3 },
    priority: 1,
    emptyMessage: "期限間近の食品はありません",
    emptyDescription: "安心してください！",
  },

  warning: {
    id: "warning",
    label: "4〜7日以内",
    shortLabel: "4〜7日",
    description: "期限が4〜7日以内の食品",
    icon: "📋",
    badgeColor: "yellow",
    chartColor: "#ffb74d",
    daysRange: { min: 4, max: 7 },
    priority: 2,
    emptyMessage: "要注意の食品はありません",
    emptyDescription: "良い状態です！",
  },

  mid_term: {
    id: "mid_term",
    label: "8〜30日以内",
    shortLabel: "8〜30日",
    description: "期限が8〜30日以内の食品",
    icon: "📅",
    badgeColor: "blue",
    chartColor: "#42a5f5",
    daysRange: { min: 8, max: 30 },
    priority: 3,
    emptyMessage: "中期の食品はありません",
    emptyDescription: "計画的な管理ができています！",
  },

  long_term: {
    id: "long_term",
    label: "1ヶ月以上",
    shortLabel: "1ヶ月以上",
    description: "期限が1ヶ月以上の食品",
    icon: "📆",
    badgeColor: "green",
    chartColor: "#388e3c",
    daysRange: { min: 31, max: Infinity },
    priority: 4,
    emptyMessage: "長期の食品はありません",
    emptyDescription: "新鮮な食品が多いですね！",
  },
} as const;

export type FoodStatusId = (typeof FOOD_STATUS)[keyof typeof FOOD_STATUS]["id"];

export type FoodStatusConfig = (typeof FOOD_STATUS)[FoodStatusId];

export const FOOD_STATUSES_BY_PRIORITY = Object.values(FOOD_STATUS).sort(
  (a, b) => a.priority - b.priority,
);
