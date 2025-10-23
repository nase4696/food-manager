export const CATEGORIES_CONFIG = [
  {
    id: "category_vegetable",
    name: "野菜",
    description: "野菜全般",
    color: "#22c55e",
    defaultExpiryDays: 3,
  },
  {
    id: "category_meat",
    name: "肉",
    description: "肉類全般",
    color: "#ef4444",
    defaultExpiryDays: 1,
  },
  {
    id: "category_fish",
    name: "魚",
    description: "魚介類全般",
    color: "#3b82f6",
    defaultExpiryDays: 2,
  },
  {
    id: "category_drink",
    name: "飲み物",
    description: "飲み物全般",
    color: "#06b6d4",
    defaultExpiryDays: 7,
  },
  {
    id: "category_seasoning",
    name: "調味料",
    description: "調味料・スパイス",
    color: "#f59e0b",
    defaultExpiryDays: 180,
  },
  {
    id: "category_instant",
    name: "インスタント",
    description: "インスタント系全般",
    color: "#f97316",
    defaultExpiryDays: 90,
  },
  {
    id: "category_sweets",
    name: "スイーツ",
    description: "お菓子・デザート",
    color: "#ec4899",
    defaultExpiryDays: 14,
  },
  {
    id: "category_dairy",
    name: "乳製品",
    description: "牛乳・チーズ・卵など",
    color: "#eab308",
    defaultExpiryDays: 7,
  },
  {
    id: "category_grain",
    name: "穀物",
    description: "米・パン・パスタなど",
    color: "#a16207",
    defaultExpiryDays: 365,
  },
  {
    id: "category_other",
    name: "その他",
    description: "その他の食品",
    color: "#6b7280",
    defaultExpiryDays: 30,
  },
] as const;

export const CATEGORY_IDS = {
  VEGETABLE: "category_vegetable",
  MEAT: "category_meat",
  FISH: "category_fish",
  DRINK: "category_drink",
  SEASONING: "category_seasoning",
  INSTANT: "category_instant",
  SWEETS: "category_sweets",
  DAIRY: "category_dairy",
  GRAIN: "category_grain",
  OTHER: "category_other",
} as const;

export type CategoryConfig = (typeof CATEGORIES_CONFIG)[number];
export type CategoryId = (typeof CATEGORY_IDS)[keyof typeof CATEGORY_IDS];
