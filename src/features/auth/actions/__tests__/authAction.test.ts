import { describe, it, expect, vi, beforeEach } from "vitest";
import { AuthError } from "next-auth";

import prismaMock from "@/mocks/prisma";

const { signInMock, redirectMock, bcryptMock, UserCreateMock } = vi.hoisted(
  () => ({
    signInMock: vi.fn(),
    redirectMock: vi.fn(),
    bcryptMock: {
      hash: vi.fn(),
    },
    UserCreateMock: vi.fn(),
  }),
);

vi.mock("next/navigation", () => ({
  redirect: redirectMock,
}));

vi.mock("@/auth", () => ({
  signIn: signInMock,
}));

vi.mock("@/lib/prisma", () => ({
  prisma: prismaMock,
}));

vi.mock("bcryptjs", () => ({
  default: {
    hash: bcryptMock.hash,
  },
}));

vi.mock("@/lib/user/user-data-fetcher", () => ({
  UserCreate: UserCreateMock,
}));

import { LoginAction, SignupAction } from "../authAction";

describe("LoginAction", () => {
  beforeEach(() => {
    signInMock.mockClear();
    redirectMock.mockClear();
  });

  it("不正なメールアドレスの場合はエラーを返す", async () => {
    const formData = new FormData();
    formData.append("email", "不正なメール");
    formData.append("password", "123");

    const result = await LoginAction(null, formData);

    expect(result.status).toBe("error");
  });

  it("正しい情報でログインするとリダイレクトする", async () => {
    signInMock.mockResolvedValue({ ok: true });

    const formData = new FormData();
    formData.append("email", "test@example.com");
    formData.append("password", "correctPassword123");
    formData.append("redirect_to", "/dashboard");

    await LoginAction(null, formData);

    expect(redirectMock).toHaveBeenCalled();
  });

  it("パスワードが間違っているとエラーを返す", async () => {
    const error = new AuthError();
    error.type = "CredentialsSignin";

    signInMock.mockRejectedValue(error);

    const formData = new FormData();
    formData.append("email", "test@example.com");
    formData.append("password", "wrongpassword");

    const result = await LoginAction(null, formData);

    expect(result.status).toBe("error");
    expect(result.error?.[""]?.[0]).toContain(
      "メールアドレスまたはパスワードが間違っています",
    );
  });

  it("予期しないエラーが発生した場合はシステムエラーメッセージを返す", async () => {
    signInMock.mockRejectedValue(new Error("Database connection failed"));

    const formData = new FormData();
    formData.append("email", "test@example.com");
    formData.append("password", "password123");

    const result = await LoginAction(null, formData);

    expect(result.status).toBe("error");
    expect(result.error?.[""]?.[0]).toContain("システムエラーが発生しました");
  });
});

describe("signupAction", () => {
  beforeEach(() => {
    signInMock.mockClear();
    redirectMock.mockClear();
    bcryptMock.hash.mockClear();
  });

  it("複数の不正な入力でバリデーションエラーが発生する", async () => {
    const formData = new FormData();
    formData.append("name", "とても長いユーザー名です");
    formData.append("email", "invalid.com");
    formData.append("password", "weak");
    formData.append("confirmPassword", "different");

    const result = await SignupAction(null, formData);

    expect(result.error?.["name"]?.[0]).toContain(
      "ユーザー名は10文字以内でお願いします",
    );
    expect(result.error?.["email"]?.[0]).toContain(
      "メールアドレスの形式が不正です",
    );
    expect(result.error?.["password"]?.[0]).toContain(
      "少なくとも1つの英字、1つの数字を含んでいる必要があります",
    );
    expect(result.error?.["confirmPassword"]?.[0]).toContain(
      "パスワードが一致しません",
    );
  });

  it("既に登録されているメールアドレスの場合はエラーを返す", async () => {
    prismaMock.user.findUnique.mockResolvedValue({
      id: "1",
      email: "test@example.com",
      name: "既存ユーザー",
      password: "hashedpassword",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const formData = new FormData();
    formData.append("name", "新しいユーザー");
    formData.append("email", "test@example.com");
    formData.append("password", "Password123");
    formData.append("confirmPassword", "Password123");

    const result = await SignupAction(null, formData);

    expect(result.error?.[""]?.[0]).toContain(
      "このメールアドレスはすでに登録されています",
    );
  });

  it("正しい情報で登録すると自動ログインする", async () => {
    prismaMock.user.findUnique.mockResolvedValue(null);

    bcryptMock.hash.mockResolvedValue("hashedpassword123");

    UserCreateMock.mockResolvedValue({
      id: "2",
      name: "新しいユーザー",
      email: "newuser@example.com",
    });

    signInMock.mockResolvedValue({ ok: true });

    const formData = new FormData();
    formData.append("name", "新しいユーザー");
    formData.append("email", "newuser@example.com");
    formData.append("password", "Password123");
    formData.append("confirmPassword", "Password123");
    formData.append("redirect_to", "/dashboard");

    await SignupAction(null, formData);

    expect(UserCreateMock).toHaveBeenCalledWith({
      name: "新しいユーザー",
      email: "newuser@example.com",
      hashedPassword: "hashedpassword123",
    });

    expect(signInMock).toHaveBeenCalledWith("credentials", {
      email: "newuser@example.com",
      password: "Password123",
      redirect: false,
    });

    expect(redirectMock).toHaveBeenCalledWith(
      "/dashboard?toast_code=register_success",
    );
  });

  it("データベースエラーが発生した場合はシステムエラーメッセージを返す", async () => {
    prismaMock.user.findUnique.mockResolvedValue(null);

    bcryptMock.hash.mockResolvedValue("hashedpassword123");

    UserCreateMock.mockRejectedValue(new Error("Database error"));

    const formData = new FormData();
    formData.append("name", "テストユーザー");
    formData.append("email", "test@example.com");
    formData.append("password", "Password123");
    formData.append("confirmPassword", "Password123");

    const result = await SignupAction(null, formData);

    expect(result.status).toBe("error");
    expect(result.error?.[""]?.[0]).toContain("システムエラーが発生しました");

    expect(signInMock).not.toHaveBeenCalled();

    expect(redirectMock).not.toHaveBeenCalled();
  });
});
