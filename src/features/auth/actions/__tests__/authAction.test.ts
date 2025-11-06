// src/features/auth/actions/__tests__/LoginAction.test.ts
import { describe, it, expect, vi, beforeEach } from "vitest";
import { AuthError } from "next-auth";

// このテストだけの特別なモック
// vi.hoistedでモックを作成して変数に保持
const { signInMock, redirectMock } = vi.hoisted(() => ({
  signInMock: vi.fn(), // 挙動制御が必要
  redirectMock: vi.fn(), // 呼び出し検証が必要
}));

// モジュールにモックを割り当て
vi.mock("next/navigation", () => ({
  redirect: redirectMock,
}));

vi.mock("@/auth", () => ({
  signIn: signInMock,
}));

// テスト対象のインポートはモック定義の後で
import { LoginAction } from "../authAction";

describe("LoginAction", () => {
  beforeEach(() => {
    // 各テスト前にモックをリセット
    signInMock.mockClear();
    redirectMock.mockClear();
  });

  // テストケース1: バリデーションエラー
  it("不正なメールアドレスの場合はエラーを返す", async () => {
    const formData = new FormData();
    formData.append("email", "不正なメール");
    formData.append("password", "123");

    const result = await LoginAction(null, formData);

    expect(result.status).toBe("error");
  });

  // テストケース2: ログイン成功
  it("正しい情報でログインするとリダイレクトする", async () => {
    // 挙動制御：ログイン成功をモック
    signInMock.mockResolvedValue({ ok: true });

    const formData = new FormData();
    formData.append("email", "test@example.com");
    formData.append("password", "correctPassword123");
    formData.append("redirect_to", "/dashboard");

    await LoginAction(null, formData);

    // 呼び出し検証：リダイレクトが呼ばれたか
    expect(redirectMock).toHaveBeenCalled();
  });

  // テストケース3: パスワード間違い
  it("パスワードが間違っているとエラーを返す", async () => {
    // 挙動制御：AuthErrorを作成
    const error = new AuthError();
    error.type = "CredentialsSignin";

    // ログイン失敗をモック
    signInMock.mockRejectedValue(error);

    const formData = new FormData();
    formData.append("email", "test@example.com");
    formData.append("password", "wrongpassword");

    const result = await LoginAction(null, formData);

    // 結果の検証
    expect(result.status).toBe("error");
    expect(result.error?.[""]?.[0]).toContain(
      "メールアドレスまたはパスワードが間違っています",
    );
  });

  // テストケース4: システムエラー
  it("予期しないエラーが発生した場合はシステムエラーメッセージを返す", async () => {
    // 挙動制御：一般的なエラーをモック
    signInMock.mockRejectedValue(new Error("Database connection failed"));

    const formData = new FormData();
    formData.append("email", "test@example.com");
    formData.append("password", "password123");

    const result = await LoginAction(null, formData);

    // 結果の検証
    expect(result.status).toBe("error");
    expect(result.error?.[""]?.[0]).toContain("システムエラーが発生しました");
  });
});
