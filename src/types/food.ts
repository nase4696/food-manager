import type { Food, Category, StorageSpace } from "@prisma/client";

export type FoodWithRelations = Food & {
  category: Category;
  storage: StorageSpace;
};

export type FoodDisplay = Pick<Food, "id" | "name" | "expiryDate"> & {
  category: {
    name: string;
    color: string | null;
  };
  storage: {
    name: string;
  };
};
