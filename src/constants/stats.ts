import type { ExpiryStats } from "@/types/food";

export type StatConfig = {
  key: keyof ExpiryStats;
  label: string;
  description: string;
  icon: string;
  color: string;
  bgColor: string;
  textColor: string;
};

export const STATS_CONFIG = [
  {
    key: "active",
    label: "未消費",
    description: "全食品",
    icon: "📦",
    color: "gray",
    bgColor: "bg-blue-50",
    textColor: "text-gray-900",
  },
  {
    key: "warning",
    label: "要注意",
    description: "4-7日後",
    icon: "📋",
    color: "yellow",
    bgColor: "bg-yellow-50",
    textColor: "text-yellow-600",
  },
  {
    key: "expiringSoon",
    label: "期限間近",
    description: "3日以内",
    icon: "⚠️",
    color: "orange",
    bgColor: "bg-orange-50",
    textColor: "text-orange-600",
  },
  {
    key: "expired",
    label: "期限切れ",
    description: "確認必要",
    icon: "🚫",
    color: "red",
    bgColor: "bg-red-50",
    textColor: "text-red-600",
  },
] as const satisfies StatConfig[];

export type StatConfigType = (typeof STATS_CONFIG)[number];
