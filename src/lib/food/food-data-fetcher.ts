import "server-only";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { getStartOfDay, getEndOfDaysLater } from "@/lib/utils/date-utils";

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

// 期限別分布データのみを取得する関数
export async function getExpiryDistribution(): Promise<
  Array<{ name: string; value: number; color: string }>
> {
  const session = await getServerSession();
  if (!session || !session.user) redirect("/login");

  const todayStart = getStartOfDay(new Date());
  const threeDaysLater = getEndOfDaysLater(3);
  const sevenDaysLater = getEndOfDaysLater(7);
  const thirtyDaysLater = getEndOfDaysLater(30);

  const [expired, expiringSoon, warning, midTerm, longTerm] = await Promise.all(
    [
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
          expiryDate: { gte: todayStart, lte: threeDaysLater },
        },
      }),
      prisma.food.count({
        where: {
          userId: session.user.id,
          isConsumed: false,
          expiryDate: { gt: threeDaysLater, lte: sevenDaysLater },
        },
      }),
      prisma.food.count({
        where: {
          userId: session.user.id,
          isConsumed: false,
          expiryDate: { gt: sevenDaysLater, lte: thirtyDaysLater },
        },
      }),
      prisma.food.count({
        where: {
          userId: session.user.id,
          isConsumed: false,
          expiryDate: { gt: thirtyDaysLater },
        },
      }),
    ],
  );

  return [
    { name: "期限切れ", value: expired, color: "#ef5350" },
    { name: "期限間近（3日以内）", value: expiringSoon, color: "#ff9800" },
    { name: "要注意（4〜7日）", value: warning, color: "#ffb74d" },
    { name: "8日〜30日", value: midTerm, color: "#42a5f5" },
    { name: "1ヶ月以上", value: longTerm, color: "#388e3c" },
  ];
}

export async function getFoodsByExpiry() {
  const session = await getServerSession();
  if (!session || !session.user) redirect("/login");

  const [expiredFoods, expiringFoods, warningFoods] = await Promise.all([
    getExpiredFoods(),
    getExpiringFoods(3),
    getWarningFoods(),
  ]);

  return { expiredFoods, expiringFoods, warningFoods };
}

export async function getCategoryStats() {
  const session = await getServerSession();

  if (!session || !session.user) {
    redirect("/login");
  }

  try {
    const categoryStats = await prisma.category.findMany({
      include: {
        foods: {
          where: {
            userId: session.user.id,
            isConsumed: false,
          },
          select: {
            id: true,
          },
        },
      },
      orderBy: {
        name: "asc",
      },
    });

    const formattedStats = categoryStats.map((category) => ({
      id: category.id,
      name: category.name,
      count: category.foods.length,
      color: category.color || "#6B7280",
      description: category.description || "",
    }));

    console.log(`✅ カテゴリー統計を${formattedStats.length}件取得しました`);
    return formattedStats;
  } catch (error) {
    console.error("❌ カテゴリー統計の取得に失敗:", error);
    return [];
  }
}
