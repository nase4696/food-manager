import "server-only";
import { getDaysRemaining } from "@/lib/utils/date-utils";
import {
  FOOD_STATUSES_BY_PRIORITY,
  type FoodStatusId,
} from "@/constants/food-status";
import type { CategoryStat } from "@/types/category";
import { withErrorHandling } from "@/lib/error/error-handler";
import { ErrorTestingService } from "@/lib/dev/error-testing";

import {
  findAllFoodsByUserId,
  toFoodDisplay,
  type FoodRaw,
  type FoodDisplay,
} from "../dal/food-repository";

function createEmptyDashboardData() {
  const foodLists = Object.fromEntries(
    FOOD_STATUSES_BY_PRIORITY.map((status): [FoodStatusId, FoodDisplay[]] => [
      status.id,
      [],
    ]),
  ) as Record<FoodStatusId, FoodDisplay[]>;

  const expiryDistribution = FOOD_STATUSES_BY_PRIORITY.map((status) => ({
    name: status.label,
    description: status.shortLabel,
    value: 0,
    color: status.chartColor,
  }));

  return {
    foodLists,
    expiryDistribution,
    categoryDistribution: [],
    isEmpty: true,
    totalFoodCount: 0,
  };
}

export function calculateCategoryStats(foods: FoodRaw[]): CategoryStat[] {
  const categoryMap = new Map<string, CategoryStat>();

  for (const food of foods) {
    const categoryId = food.category.id;
    const existing = categoryMap.get(categoryId);

    if (existing) {
      existing.count++;
    } else {
      categoryMap.set(categoryId, {
        id: categoryId,
        name: food.category.name,
        count: 1,
        color: food.category.color || "#6B7280",
      });
    }
  }

  return Array.from(categoryMap.values()).sort((a, b) => b.count - a.count);
}

function createFoodLists(foods: FoodDisplay[]) {
  const foodLists: Record<FoodStatusId, FoodDisplay[]> = {} as Record<
    FoodStatusId,
    FoodDisplay[]
  >;

  for (const status of FOOD_STATUSES_BY_PRIORITY) {
    foodLists[status.id] = [];
  }

  for (const food of foods) {
    if (!food.expiryDate) continue;

    const days = getDaysRemaining(food.expiryDate);
    if (days === null) continue;

    for (const status of FOOD_STATUSES_BY_PRIORITY) {
      if (days >= status.daysRange.min && days <= status.daysRange.max) {
        foodLists[status.id].push(food);
        break;
      }
    }
  }

  return foodLists;
}

function createExpiryDistribution(
  foodLists: Record<FoodStatusId, FoodDisplay[]>,
) {
  return FOOD_STATUSES_BY_PRIORITY.map((status) => ({
    name: status.label,
    description: status.shortLabel,
    value: foodLists[status.id]?.length || 0,
    color: status.chartColor,
  }));
}

function createCategoryDistribution(categoryStats: CategoryStat[]) {
  return categoryStats
    .filter(
      (stat): stat is CategoryStat => stat !== undefined && stat.count > 0,
    )
    .map((stat) => ({
      name: stat.name,
      value: stat.count,
      color: stat.color,
    }));
}

export async function getDashboardData() {
  return withErrorHandling(
    "getDashboardData",
    async () => {
      ErrorTestingService.throwForcedErrorIfNeeded();

      const rawFoods = await findAllFoodsByUserId();

      if (rawFoods.length === 0) {
        return createEmptyDashboardData();
      }

      const allFoods = rawFoods.map(toFoodDisplay);
      const foodLists = createFoodLists(allFoods);
      const expiryDistribution = createExpiryDistribution(foodLists);
      const categoryStats = calculateCategoryStats(rawFoods);
      const categoryDistribution = createCategoryDistribution(categoryStats);

      return {
        foodLists,
        expiryDistribution,
        categoryStats,
        categoryDistribution,
        totalFoodCount: allFoods.length,
        isEmpty: false,
      };
    },
    {
      timestamp: new Date().toISOString(),
      dataSource: "prisma",
      operation: "read",
    },
  );
}
