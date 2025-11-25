import type { FoodWithRelations, FoodDisplay } from "@/types/food";

// Prismaのデータを表示用に変換
export function convertToFoodDisplay(food: FoodWithRelations): FoodDisplay {
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

// 食品の配列を一括変換
export function convertToFoodDisplayArray(
  foods: FoodWithRelations[],
): FoodDisplay[] {
  return foods.map(convertToFoodDisplay);
}
