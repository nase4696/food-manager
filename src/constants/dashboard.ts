import { FOOD_STATUSES_BY_PRIORITY, type FoodStatusId } from "./food-status";

export const DASHBOARD_SECTIONS = FOOD_STATUSES_BY_PRIORITY.map((status) => ({
  id: status.id,
  badgeColor: status.badgeColor,
  icon: status.icon,
  title: `${status.label}の食品`,
  description: status.description,
  emptyMessage: status.emptyMessage,
  emptyDescription: status.emptyDescription,
  defaultExpanded: status.id === "expired" || status.id === "urgent",
}));

export const DASHBOARD_CONFIG = {
  hideEmptySections: true,
  alwaysShowStatuses: ["expired", "urgent", "warning"] as FoodStatusId[],
  defaultExpandedCharts: true,
} as const;
