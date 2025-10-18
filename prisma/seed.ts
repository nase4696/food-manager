import { hash } from "bcryptjs";

import { categoriesConfig, CATEGORY_IDS } from "@/config/categories";
import { prisma } from "@/lib/prisma";

export async function seeding(): Promise<
  | {
      data: {
        countUsers: number;
        countStorageSpaces: number;
        countFoods: number;
        countCategories: number;
      };
      status: "success";
    }
  | {
      error: Error;
      status: "error";
    }
> {
  try {
    await prisma.$transaction(async (prisma) => {
      console.log("🧹 古いデータを削除中...");

      await prisma.food.deleteMany();
      await prisma.storageSpace.deleteMany();
      await prisma.user.deleteMany();
      await prisma.category.deleteMany();

      console.log("🏷️ 食品カテゴリーを作成中...");

      // カテゴリー作成
      await Promise.all(
        categoriesConfig.map((categoryConfig) =>
          prisma.category.create({
            data: {
              id: categoryConfig.id,
              name: categoryConfig.name,
              description: categoryConfig.description,
              color: categoryConfig.color,
              defaultExpiryDays: categoryConfig.defaultExpiryDays,
            },
          }),
        ),
      );

      // ユーザー① - 山田太郎
      const userTaro = await prisma.user.create({
        data: {
          email: "taro@example.com",
          name: "山田太郎",
          password: await hash("password123", 12),
        },
      });

      // 山田太郎のストレージスペース
      const storageTaro1 = await prisma.storageSpace.create({
        data: {
          name: "冷蔵庫",
          userId: userTaro.id,
        },
      });

      const storageTaro2 = await prisma.storageSpace.create({
        data: {
          name: "冷凍庫",
          userId: userTaro.id,
        },
      });

      const storageTaro3 = await prisma.storageSpace.create({
        data: {
          name: "パントリー",
          userId: userTaro.id,
        },
      });

      // 山田太郎の食品を作成
      await prisma.food.createMany({
        data: [
          {
            name: "牛乳",
            categoryId: CATEGORY_IDS.DAIRY,
            expiryDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
            storageId: storageTaro1.id,
            userId: userTaro.id,
          },
          {
            name: "卵",
            categoryId: CATEGORY_IDS.DAIRY,
            expiryDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
            storageId: storageTaro1.id,
            userId: userTaro.id,
          },
          {
            name: "にんじん",
            categoryId: CATEGORY_IDS.VEGETABLE,
            expiryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            storageId: storageTaro1.id,
            userId: userTaro.id,
          },
          {
            name: "鶏むね肉",
            categoryId: CATEGORY_IDS.MEAT,
            expiryDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
            storageId: storageTaro1.id,
            userId: userTaro.id,
          },
          {
            name: "アイスクリーム",
            categoryId: CATEGORY_IDS.SWEETS,
            expiryDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
            storageId: storageTaro2.id,
            userId: userTaro.id,
          },
          {
            name: "冷凍ほうれん草",
            categoryId: CATEGORY_IDS.VEGETABLE,
            expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            storageId: storageTaro2.id,
            userId: userTaro.id,
          },
          {
            name: "米",
            categoryId: CATEGORY_IDS.GRAIN,
            expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
            storageId: storageTaro3.id,
            userId: userTaro.id,
          },
          {
            name: "インスタントラーメン",
            categoryId: CATEGORY_IDS.INSTANT,
            expiryDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000),
            storageId: storageTaro3.id,
            userId: userTaro.id,
          },
          {
            name: "醤油",
            categoryId: CATEGORY_IDS.SEASONING,
            expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
            storageId: storageTaro3.id,
            userId: userTaro.id,
          },
        ],
      });

      // ユーザー② - 朝倉シン
      const userHanako = await prisma.user.create({
        data: {
          email: "hanako@example.com",
          name: "朝倉シン",
          password: await hash("password123", 12),
        },
      });

      // 6. 朝倉シンのストレージスペース
      const storageHanako = await prisma.storageSpace.create({
        data: {
          name: "冷蔵庫",
          userId: userHanako.id,
        },
      });

      // 7. 朝倉シンの食品を作成（期限未設定）
      await prisma.food.createMany({
        data: [
          {
            name: "テスト用の肉",
            categoryId: CATEGORY_IDS.MEAT,

            storageId: storageHanako.id,
            userId: userHanako.id,
          },
          {
            name: "テスト用の野菜",
            categoryId: CATEGORY_IDS.VEGETABLE,

            storageId: storageHanako.id,
            userId: userHanako.id,
          },
          {
            name: "テスト用の魚",
            categoryId: CATEGORY_IDS.FISH,

            storageId: storageHanako.id,
            userId: userHanako.id,
          },
          {
            name: "鮭",
            categoryId: CATEGORY_IDS.FISH,
            expiryDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
            storageId: storageHanako.id,
            userId: userHanako.id,
          },
          {
            name: "コーラ",
            categoryId: CATEGORY_IDS.DRINK,
            expiryDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
            storageId: storageHanako.id,
            userId: userHanako.id,
          },
          {
            name: "チーズケーキ",
            categoryId: CATEGORY_IDS.SWEETS,
            expiryDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
            storageId: storageHanako.id,
            userId: userHanako.id,
          },
        ],
      });

      //ユーザー③ - 名前なしユーザー
      const userTest = await prisma.user.create({
        data: {
          email: "test@example.com",
          name: null,
          password: await hash("password123", 12),
        },
      });

      const storageTest = await prisma.storageSpace.create({
        data: {
          name: "冷蔵庫",
          userId: userTest.id,
        },
      });

      await prisma.food.create({
        data: {
          name: "ヨーグルト",
          categoryId: CATEGORY_IDS.DAIRY,
          expiryDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
          storageId: storageTest.id,
          userId: userTest.id,
          isConsumed: true,
        },
      });

      console.log("シードデータ作成完了！");
    });

    const countUsers = await prisma.user.count();
    const countStorageSpaces = await prisma.storageSpace.count();
    const countFoods = await prisma.food.count();
    const countCategories = await prisma.category.count();

    return {
      data: {
        countUsers,
        countStorageSpaces,
        countFoods,
        countCategories,
      },
      status: "success",
    };
  } catch (error) {
    console.error("エラー詳細:", error);
    return { error: error as Error, status: "error" };
  }
}

async function main() {
  const result = await seeding();

  if (result.status === "success") {
    console.log(
      `\n シードデータの投入が成功しました！\n` +
        `作成されたデータ:\n` +
        `   ユーザー: ${result.data.countUsers}人\n` +
        `   ストレージスペース: ${result.data.countStorageSpaces}個\n` +
        `   食品: ${result.data.countFoods}品目\n` +
        `   食品カテゴリー: ${result.data.countCategories}種類\n` +
        `\n`,
    );
  } else {
    console.error("シードデータの投入に失敗しました:");
    console.error(result.error);
  }
}

main()
  .catch((e) => {
    console.error("予期せぬエラーが発生しました:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
