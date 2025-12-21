import { beforeEach, describe, expect, it, vi } from "vitest";

import prismaMock from "@/mocks/prisma";

import { UserCreate } from "../user-data-fetcher";

vi.mock("@/lib/prisma", () => ({
  prisma: prismaMock,
}));

describe("UserCreate", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it("正しい情報でユーザーを作成し、DTOで変換して返す", async () => {
    const mockUser = {
      id: "user-123",
      name: "山田太郎",
      email: "taro@example.com",
      password: "hashed-password-123",
      createdAt: new Date("2024-01-01"),
      updatedAt: new Date("2024-01-01"),
    };

    prismaMock.user.create.mockResolvedValue(mockUser);

    const result = await UserCreate({
      name: "山田太郎",
      email: "taro@example.com",
      hashedPassword: "hashed-password-123",
    });

    expect(prismaMock.user.create).toHaveBeenCalledWith({
      data: {
        name: "山田太郎",
        email: "taro@example.com",
        password: "hashed-password-123",
      },
    });

    expect(result).toEqual({
      id: "user-123",
      name: "山田太郎",
      email: "taro@example.com",
    });
  });

  it("データベースエラーが発生した場合はエラーを投げる", async () => {
    prismaMock.user.create.mockRejectedValue(
      new Error("データベース接続エラー"),
    );

    await expect(
      UserCreate({
        name: "山田太郎",
        email: "taro@example.com",
        hashedPassword: "hashed-password-123",
      }),
    ).rejects.toThrow("データベース接続エラー");
  });
});
