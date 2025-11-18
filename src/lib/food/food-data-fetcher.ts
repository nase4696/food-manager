import "server-only";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { getStartOfDay, getEndOfDaysLater } from "@/lib/utils/date-utils";

import { getServerSession } from "../session";

// 期限が近い食品を取得
export async function getExpiringFoods(days: number) {
  const session = await getServerSession();

  if (!session || !session.user) {
    redirect("/login");
  }

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
