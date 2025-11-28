import "server-only";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { getStartOfDay, getEndOfDaysLater } from "@/lib/utils/date-utils";
import type { FoodWithRelations, ExpiryStats, FoodDisplay } from "@/types/food";
import { convertToFoodDisplayArray } from "@/lib/food/food-type-utils";

import { getServerSession } from "../session";

export async function getWarningFoods() {
  const session = await getServerSession();

  if (!session || !session.user) {
    redirect("/login");
  }

  const threeDaysLater = getEndOfDaysLater(4);
  const sevenDaysLater = getEndOfDaysLater(7);

  try {
    const foods = await prisma.food.findMany({
      where: {
        userId: session.user.id,
        isConsumed: false,
        expiryDate: {
          gte: threeDaysLater,
          lte: sevenDaysLater,
        },
      },
      include: {
        category: true,
        storage: true,
      },
      orderBy: {
        expiryDate: "asc",
      },
    });

    console.log(`✅ 要注意食品を${foods.length}件取得しました`);
    return foods;
  } catch (error) {
    console.error("❌ 要注意食品の取得に失敗:", error);
    return [];
  }
}

// 期限が近い食品を取得
export async function getExpiringFoods(days: number) {
  const session = await getServerSession();

  if (!session || !session.user) {
    redirect("/login");
  }

  console.log("ユーザー情報:", session.user);

  const todayStart = getStartOfDay(new Date());
  const targetDate = getEndOfDaysLater(days);

  try {
    const foods = await prisma.food.findMany({
      where: {
        userId: session.user.id,
        isConsumed: false,
        expiryDate: {
          gte: todayStart,
          lte: targetDate,
        },
      },
      include: {
        category: true,
        storage: true,
      },
      orderBy: {
        expiryDate: "asc",
      },
    });

    console.log(`✅ ${days}日以内の食品を${foods.length}件取得しました`);
    return foods;
  } catch (error) {
    console.error("❌ 食品データの取得に失敗:", error);
    return [];
  }
}

// 期限切れ食品を取得
export async function getExpiredFoods() {
  const session = await getServerSession();

  if (!session || !session.user) {
    redirect("/login");
  }

  const todayStart = getStartOfDay(new Date());

  try {
    const foods = await prisma.food.findMany({
      where: {
        userId: session.user.id,
        isConsumed: false,
        expiryDate: {
          lt: todayStart,
        },
      },
      include: {
        category: true,
        storage: true,
      },
      orderBy: {
        expiryDate: "asc",
      },
    });

    console.log(`✅ 期限切れ食品を${foods.length}件取得しました`);
    return foods;
  } catch (error) {
    console.error("❌ 期限切れ食品の取得に失敗:", error);
    return [];
  }
}

// 期限切れていない未消費食品を全て取得
export async function getAllActiveFoods() {
  const session = await getServerSession();

  if (!session || !session.user) {
    redirect("/login");
  }

  const todayStart = getStartOfDay(new Date());

  try {
    const foods = await prisma.food.findMany({
      where: {
        userId: session.user.id,
        isConsumed: false,
        expiryDate: {
          gte: todayStart,
        },
      },
      include: {
        category: true,
        storage: true,
      },
      orderBy: {
        expiryDate: "asc",
      },
    });

    console.log(`✅ 期限切れていない未消費食品を${foods.length}件取得しました`);
    return foods;
  } catch (error) {
    console.error("❌ 期限切れていない食品の取得に失敗:", error);
    return [];
  }
}

// 統計情報を取得
export async function getFoodStats() {
  const session = await getServerSession();

  if (!session || !session.user) {
    redirect("/login");
  }

  const todayStart = getStartOfDay(new Date());
  const threeDaysLater = getEndOfDaysLater(3);

  const [total, consumed, expiringSoon, expired, activeNotExpired] =
    await Promise.all([
      prisma.food.count({ where: { userId: session.user.id } }),
      prisma.food.count({
        where: { userId: session.user.id, isConsumed: true },
      }),
      prisma.food.count({
        where: {
          userId: session.user.id,
          isConsumed: false,
          expiryDate: { gte: todayStart, lte: threeDaysLater },
        },
      }),
      prisma.food.count({
        where: {
          userId: session.user.id,
          isConsumed: false,
          expiryDate: { lt: todayStart },
        },
      }),
      prisma.food.count({
        where: {
          userId: session.user.id,
          isConsumed: false,
          expiryDate: { gte: todayStart },
        },
      }),
    ]);

  const stats = {
    total,
    consumed,
    expiringSoon,
    expired,
    active: total - consumed,
    activeNotExpired,
    safe: activeNotExpired - expiringSoon,
  };

  console.log("✅ 統計情報を取得完了:", stats);
  return stats;
}

export async function getExpiryStatusStats(): Promise<{
  stats: ExpiryStats;
  expiringFoods: FoodDisplay[];
  warningFoods: FoodDisplay[];
  expiredFoods: FoodDisplay[];
}> {
  const session = await getServerSession();

  if (!session || !session.user) {
    redirect("/login");
  }

  const todayStart = getStartOfDay(new Date());
  const threeDaysLater = getEndOfDaysLater(3);
  const fourDaysLater = getEndOfDaysLater(4);
  const sevenDaysLater = getEndOfDaysLater(7);

  // 統計データの取得
  const [total, consumed, expiringSoon, warning, expired, activeFoods] =
    await Promise.all([
      prisma.food.count({ where: { userId: session.user.id } }),
      prisma.food.count({
        where: { userId: session.user.id, isConsumed: true },
      }),
      prisma.food.count({
        where: {
          userId: session.user.id,
          isConsumed: false,
          expiryDate: { gte: todayStart, lte: threeDaysLater },
        },
      }),
      prisma.food.count({
        where: {
          userId: session.user.id,
          isConsumed: false,
          expiryDate: { gte: fourDaysLater, lte: sevenDaysLater },
        },
      }),
      prisma.food.count({
        where: {
          userId: session.user.id,
          isConsumed: false,
          expiryDate: { lt: todayStart },
        },
      }),
      prisma.food.findMany({
        where: {
          userId: session.user.id,
          isConsumed: false,
        },
        include: {
          category: true,
          storage: true,
        },
      }) as Promise<FoodWithRelations[]>,
    ]);

  const stats: ExpiryStats = {
    active: total - consumed,
    warning,
    expiringSoon,
    expired,
  };

  // 期限間近の食品（今日以降〜3日後まで）
  const expiringFoods = convertToFoodDisplayArray(
    activeFoods.filter((food) => {
      if (!food.expiryDate) return false;
      const expiry = new Date(food.expiryDate);
      return expiry >= todayStart && expiry <= threeDaysLater;
    }),
  );

  // 要注意の食品（4〜7日以内）
  const warningFoods = convertToFoodDisplayArray(
    activeFoods.filter((food) => {
      if (!food.expiryDate) return false;
      const expiry = new Date(food.expiryDate);
      return expiry >= fourDaysLater && expiry <= sevenDaysLater;
    }),
  );

  // 期限切れの食品（今日より前）
  const expiredFoods = convertToFoodDisplayArray(
    activeFoods.filter((food) => {
      if (!food.expiryDate) return false;
      const expiry = new Date(food.expiryDate);
      return expiry < todayStart;
    }),
  );

  return {
    stats,
    expiringFoods,
    warningFoods,
    expiredFoods,
  };
}
