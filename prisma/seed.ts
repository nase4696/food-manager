import { hash } from "bcryptjs";

import { CATEGORIES_CONFIG, CATEGORY_IDS } from "@/constants/categories";
import { prisma } from "@/lib/prisma";
import { getStartOfDay, getEndOfDaysLater } from "@/lib/utils/date-utils";

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

      await Promise.all(
        CATEGORIES_CONFIG.map((categoryConfig) =>
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

      //  ユーザー① - 山田太郎
      const userTaro = await prisma.user.create({
        data: {
          email: "taro@example.com",
          name: "山田太郎",
          password: await hash("password123", 12),
        },
      });

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

      await prisma.food.createMany({
        data: [
          {
            name: "牛乳",
            categoryId: CATEGORY_IDS.DAIRY,
            expiryDate: getEndOfDaysLater(1),
            storageId: storageTaro1.id,
            userId: userTaro.id,
          },
          {
            name: "鶏むね肉",
            categoryId: CATEGORY_IDS.MEAT,
            expiryDate: getEndOfDaysLater(0),
            storageId: storageTaro1.id,
            userId: userTaro.id,
          },
          {
            name: "にんじん",
            categoryId: CATEGORY_IDS.VEGETABLE,
            expiryDate: getEndOfDaysLater(2),
            storageId: storageTaro1.id,
            userId: userTaro.id,
          },

          {
            name: "卵",
            categoryId: CATEGORY_IDS.DAIRY,
            expiryDate: getEndOfDaysLater(5),
            storageId: storageTaro1.id,
            userId: userTaro.id,
          },
          {
            name: "チーズケーキ",
            categoryId: CATEGORY_IDS.SWEETS,
            expiryDate: getEndOfDaysLater(7),
            storageId: storageTaro1.id,
            userId: userTaro.id,
          },

          {
            name: "古いパン",
            categoryId: CATEGORY_IDS.GRAIN,
            expiryDate: getStartOfDay(
              new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
            ),
            storageId: storageTaro1.id,
            userId: userTaro.id,
          },
          {
            name: "昨日のヨーグルト",
            categoryId: CATEGORY_IDS.DAIRY,
            expiryDate: getStartOfDay(
              new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
            ),
            storageId: storageTaro1.id,
            userId: userTaro.id,
          },
          {
            name: "アイスクリーム",
            categoryId: CATEGORY_IDS.SWEETS,
            expiryDate: getEndOfDaysLater(60),
            storageId: storageTaro2.id,
            userId: userTaro.id,
          },
          {
            name: "冷凍ほうれん草",
            categoryId: CATEGORY_IDS.VEGETABLE,
            expiryDate: getEndOfDaysLater(30),
            storageId: storageTaro2.id,
            userId: userTaro.id,
          },
          {
            name: "米",
            categoryId: CATEGORY_IDS.GRAIN,
            expiryDate: getEndOfDaysLater(365),
            storageId: storageTaro3.id,
            userId: userTaro.id,
          },
          {
            name: "インスタントラーメン",
            categoryId: CATEGORY_IDS.INSTANT,
            expiryDate: getEndOfDaysLater(180),
            storageId: storageTaro3.id,
            userId: userTaro.id,
          },
          {
            name: "醤油",
            categoryId: CATEGORY_IDS.SEASONING,
            expiryDate: getEndOfDaysLater(365),
            storageId: storageTaro3.id,
            userId: userTaro.id,
          },
          {
            name: "【テスト】昨日期限切れ",
            categoryId: CATEGORY_IDS.DAIRY,
            expiryDate: new Date(Date.now() - 24 * 60 * 60 * 1000), // 昨日
            storageId: storageTaro1.id,
            userId: userTaro.id,
          },
          {
            name: "【テスト】今日期限切れ",
            categoryId: CATEGORY_IDS.MEAT,
            expiryDate: new Date(), // 今
            storageId: storageTaro1.id,
            userId: userTaro.id,
          },
          {
            name: "【テスト】明日期限",
            categoryId: CATEGORY_IDS.VEGETABLE,
            expiryDate: new Date(Date.now() + 24 * 60 * 60 * 1000), // 明日
            storageId: storageTaro1.id,
            userId: userTaro.id,
          },
          {
            name: "【テスト】2日後期限",
            categoryId: CATEGORY_IDS.DAIRY,
            expiryDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2日後
            storageId: storageTaro1.id,
            userId: userTaro.id,
          },
          {
            name: "【テスト】3日後期限",
            categoryId: CATEGORY_IDS.FISH,
            expiryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3日後
            storageId: storageTaro1.id,
            userId: userTaro.id,
          },
          {
            name: "【テスト】4日後期限",
            categoryId: CATEGORY_IDS.DRINK,
            expiryDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000), // 4日後
            storageId: storageTaro1.id,
            userId: userTaro.id,
          },
          {
            name: "【テスト】5日後期限",
            categoryId: CATEGORY_IDS.INSTANT,
            expiryDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5日後
            storageId: storageTaro1.id,
            userId: userTaro.id,
          },
        ],
      });

      //  ユーザー② - 朝倉シン
      const userHanako = await prisma.user.create({
        data: {
          email: "hanako@example.com",
          name: "朝倉シン",
          password: await hash("password123", 12),
        },
      });

      const storageHanako = await prisma.storageSpace.create({
        data: {
          name: "冷蔵庫",
          userId: userHanako.id,
        },
      });

      await prisma.food.createMany({
        data: [
          {
            name: "鮭",
            categoryId: CATEGORY_IDS.FISH,
            expiryDate: getEndOfDaysLater(1),
            storageId: storageHanako.id,
            userId: userHanako.id,
          },
          {
            name: "豆腐",
            categoryId: CATEGORY_IDS.DAIRY,
            expiryDate: getEndOfDaysLater(2),
            storageId: storageHanako.id,
            userId: userHanako.id,
          },

          {
            name: "チーズケーキ",
            categoryId: CATEGORY_IDS.SWEETS,
            expiryDate: getEndOfDaysLater(4),
            storageId: storageHanako.id,
            userId: userHanako.id,
          },
          {
            name: "サラダ",
            categoryId: CATEGORY_IDS.VEGETABLE,
            expiryDate: getEndOfDaysLater(6),
            storageId: storageHanako.id,
            userId: userHanako.id,
          },

          {
            name: "先週のパスタ",
            categoryId: CATEGORY_IDS.GRAIN,
            expiryDate: getStartOfDay(
              new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
            ),
            storageId: storageHanako.id,
            userId: userHanako.id,
          },

          {
            name: "コーラ",
            categoryId: CATEGORY_IDS.DRINK,
            expiryDate: getEndOfDaysLater(90),
            storageId: storageHanako.id,
            userId: userHanako.id,
          },
          {
            name: "カップ麺",
            categoryId: CATEGORY_IDS.INSTANT,
            expiryDate: getEndOfDaysLater(200),
            storageId: storageHanako.id,
            userId: userHanako.id,
          },

          {
            name: "テスト用の肉",
            categoryId: CATEGORY_IDS.MEAT,
            expiryDate: null,
            storageId: storageHanako.id,
            userId: userHanako.id,
          },
          {
            name: "テスト用の野菜",
            categoryId: CATEGORY_IDS.VEGETABLE,
            expiryDate: null,
            storageId: storageHanako.id,
            userId: userHanako.id,
          },
          {
            name: "テスト用の魚",
            categoryId: CATEGORY_IDS.FISH,
            expiryDate: null,
            storageId: storageHanako.id,
            userId: userHanako.id,
          },
        ],
      });

      //  ユーザー③ - テストユーザー
      const userTest = await prisma.user.create({
        data: {
          email: "test@example.com",
          name: "テストユーザー",
          password: await hash("password123", 12),
        },
      });

      const storageTest = await prisma.storageSpace.create({
        data: {
          name: "冷蔵庫",
          userId: userTest.id,
        },
      });

      await prisma.food.createMany({
        data: [
          {
            name: "消費済みヨーグルト",
            categoryId: CATEGORY_IDS.DAIRY,
            expiryDate: getEndOfDaysLater(10),
            storageId: storageTest.id,
            userId: userTest.id,
            isConsumed: true,
          },
          {
            name: "まだある牛乳",
            categoryId: CATEGORY_IDS.DAIRY,
            expiryDate: getEndOfDaysLater(3),
            storageId: storageTest.id,
            userId: userTest.id,
            isConsumed: false,
          },
          {
            name: "長持ちするはちみつ",
            categoryId: CATEGORY_IDS.SEASONING,
            expiryDate: getEndOfDaysLater(500),
            storageId: storageTest.id,
            userId: userTest.id,
            isConsumed: false,
          },
        ],
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
      `\n🎉 シードデータの投入が成功しました！\n` +
        `作成されたデータ:\n` +
        `👥 ユーザー: ${result.data.countUsers}人\n` +
        `📦 ストレージスペース: ${result.data.countStorageSpaces}個\n` +
        `🍎 食品: ${result.data.countFoods}品目\n` +
        `🏷️ 食品カテゴリー: ${result.data.countCategories}種類\n` +
        `\nテスト用アカウント:\n` +
        `📧 山田太郎: taro@example.com / password123\n` +
        `📧 朝倉シン: hanako@example.com / password123\n` +
        `📧 テストユーザー: test@example.com / password123\n`,
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
