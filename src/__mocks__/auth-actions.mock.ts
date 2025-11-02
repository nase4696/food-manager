import { fn } from "storybook/test";

export const LoginAction = fn().mockName("LoginAction");

LoginAction.mockImplementation(async (_, formData) => {
  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || !password) {
    return {
      status: "error" as const,
      error: {
        email: !email ? ["メールアドレスを入力して下さい"] : undefined,
        password: !password ? ["パスワードを入力して下さい"] : undefined,
      },
    };
  }

  if (email === "invalidEmail") {
    return {
      status: "error" as const,
      error: {
        email: ["メールアドレスの形式が不正です"],
      },
    };
  }

  return {
    status: "success" as const,
  };
});
