import type { Food, Category, StorageSpace } from "@prisma/client";

// Prismaの基本型をそのまま拡張
export type FoodWithRelations = Food & {
  category: Category;
  storage: StorageSpace;
};

// ダッシュボード用の表示型（必要なフィールドだけ抽出）
export type FoodDisplay = Pick<Food, "id" | "name" | "expiryDate"> & {
  category: {
    name: string;
    color: string | null;
  };
  storage: {
    name: string;
  };
};

// 統計データ型
export interface ExpiryStats {
  active: number; // 未消費の総食品数
  warning: number; // 要注意（4-7日）
  expiringSoon: number; // 期限間近（3日以内）
  expired: number; // 期限切れ
}

export type FoodStatus = "safe" | "warning" | "urgent" | "expired";
