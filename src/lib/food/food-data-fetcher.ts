import "server-only";
import { prisma } from "@/lib/prisma";
import { requireSession } from "@/lib/auth/require-session";
import { getDaysRemaining } from "@/lib/utils/date-utils";
import {
  FOOD_STATUSES_BY_PRIORITY,
  type FoodStatusId,
} from "@/constants/food-status";
import type { FoodDisplay, FoodWithRelations } from "@/types/food";

export type DashboardData = {
  foodLists: Record<FoodStatusId, FoodDisplay[]>;
  expiryDistribution: Array<{
    name: string;
    description: string;
    value: number;
    color: string;
  }>;
  categoryStats: Array<{
    id: string;
    name: string;
    count: number;
    color: string;
  }>;
  totalFoodCount: number;
};

export async function getDashboardData(): Promise<DashboardData> {
  const session = await requireSession();
  const userId = session.user.id;

  try {
    // ✅ 1: 1回のクエリですべて取得（公式推奨）
    console.time("DBクエリ実行");
    const allFoods = await prisma.food.findMany({
      where: {
        userId,
        isConsumed: false,
      },
      // ✅ includeで関連データを一括取得
      include: {
        category: true, // カテゴリーデータも一緒に
        storage: true, // 保存場所データも一緒に
      },
      orderBy: {
        expiryDate: "asc",
      },
    });
    console.timeEnd("DBクエリ実行");

    const totalFoodCount = allFoods.length;
    console.log(`✅ 全食品${totalFoodCount}件を1回のクエリで取得`);

    // ✅ 2: メモリ上で分類（高速）
    console.time("メモリ分類");
    const foodLists = FOOD_STATUSES_BY_PRIORITY.reduce(
      (acc, status) => {
        acc[status.id] = allFoods.filter((food) => {
          if (!food.expiryDate) return false;
          const days = getDaysRemaining(food.expiryDate);
          return (
            days !== null &&
            days >= status.daysRange.min &&
            days <= status.daysRange.max
          );
        });
        return acc;
      },
      {} as Record<FoodStatusId, FoodWithRelations[]>,
    );
    console.timeEnd("メモリ分類");

    // ✅ 3: 期限分布を計算（DBクエリ不要）
    const expiryDistribution = FOOD_STATUSES_BY_PRIORITY.map((status) => ({
      name: status.label,
      description: status.shortLabel, // 日数範囲を追加
      value: foodLists[status.id].length,
      color: status.chartColor,
    }));

    // ✅ 4: カテゴリー統計を計算（Mapで効率化）
    console.time("カテゴリー集計");
    const categoryMap = new Map<
      string,
      {
        id: string;
        name: string;
        count: number;
        color: string;
      }
    >();

    allFoods.forEach((food) => {
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
    });

    const categoryStats = Array.from(categoryMap.values()).sort(
      (a, b) => b.count - a.count,
    );
    console.timeEnd("カテゴリー集計");

    return {
      foodLists,
      expiryDistribution,
      categoryStats,
      totalFoodCount,
    };
  } catch (error) {
    console.error("❌ ダッシュボードデータ取得エラー:", error);
    throw new Error("食品データの取得に失敗しました。");
  }
}
