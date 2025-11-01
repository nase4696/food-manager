declare module "#auth-actions" {
  import type { LoginAction as OriginalLoginAction } from "@/features/auth/actions/authAction";
  // 値としてのLoginActionを宣言
  export const LoginAction: OriginalLoginAction;
}
