import "server-only";
import { prisma } from "@/lib/prisma";
import { requireSession } from "@/lib/auth/require-session";

export async function findAllFoodsByUserId() {
  const session = await requireSession();
  const userId = session.user.id;

  const foods = await prisma.food.findMany({
    where: { userId, isConsumed: false },
    select: {
      id: true,
      name: true,
      expiryDate: true,
      category: { select: { id: true, name: true, color: true } },
      storage: { select: { id: true, name: true } },
    },
    orderBy: { expiryDate: "asc" },
  });

  return foods;
}

export function toFoodDisplay(food: FoodRaw) {
  return {
    id: food.id,
    name: food.name,
    expiryDate: food.expiryDate,
    category: {
      name: food.category.name,
      color: food.category.color,
    },
    storage: {
      name: food.storage.name,
    },
  };
}

export type FoodRaw = Awaited<ReturnType<typeof findAllFoodsByUserId>>[number];
export type FoodDisplay = ReturnType<typeof toFoodDisplay>;
