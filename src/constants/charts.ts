import { FOOD_STATUS } from "./food-status";

export const CHART_COLORS = {
  expired: FOOD_STATUS.expired.chartColor,
  urgent: FOOD_STATUS.urgent.chartColor,
  warning: FOOD_STATUS.warning.chartColor,
  mid_term: FOOD_STATUS.mid_term.chartColor,
  long_term: FOOD_STATUS.long_term.chartColor,
} as const;

export const CHART_THEMES = {
  CATEGORY: {
    icon: "📊",
    iconBgColor: "purple",
    title: "カテゴリー分布",
    description: "食品のカテゴリー分布を円グラフで表示",
    emptyTitle: "カテゴリー分布グラフ",
    emptyDescription: "食品のカテゴリー別分布",
  },
  EXPIRY: {
    icon: "📆",
    iconBgColor: "blue",
    title: "期限別分布グラフ",
    description: "食品の期限状態をドーナツグラフで確認",
    emptyTitle: "期限別分布",
    emptyDescription: "食品の期限別分布",
  },
} as const;

export const CHART_CONFIG = {
  PIE: {
    innerRadius: 30,
    outerRadius: 100,
    paddingAngle: 2,
  },
  DONUT: {
    innerRadius: 60,
    outerRadius: 100,
    paddingAngle: 2,
  },
} as const;
