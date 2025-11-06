import { describe, it, expect, vi, beforeEach } from "vitest";
import { AuthError } from "next-auth";

const { signInMock, redirectMock } = vi.hoisted(() => ({
  signInMock: vi.fn(),
  redirectMock: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  redirect: redirectMock,
}));

vi.mock("@/auth", () => ({
  signIn: signInMock,
}));

import { LoginAction } from "../authAction";

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
