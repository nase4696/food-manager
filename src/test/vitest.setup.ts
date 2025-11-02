// src/test/vitest.setup.ts - 最適化版
import { vi, afterEach } from "vitest";

// 各テスト後にモックをリセット
afterEach(() => {
  vi.clearAllMocks();
});

// LoginActionで使うモックだけを設定
vi.mock("next/navigation", () => ({
  redirect: vi.fn(), // LoginActionで使用
}));

vi.mock("@/auth", () => ({
  signIn: vi.fn(), // LoginActionで使用
  signOut: vi.fn(),
  auth: vi.fn(),
}));
