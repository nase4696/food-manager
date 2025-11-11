declare module "#auth-actions" {
  import type {
    LoginAction as OriginalLoginAction,
    SignupAction as OriginalSignupAction,
  } from "@/features/auth/actions/authAction";

  export const LoginAction: OriginalLoginAction;

  export const SignupAction: OriginalSignupAction;
}
