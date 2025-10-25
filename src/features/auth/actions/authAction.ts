"use server";

import { parseWithZod } from "@conform-to/zod";
import { redirect } from "next/navigation.js";
import { AuthError } from "next-auth";

import { signIn } from "@/auth";

import { loginSchema } from "../validations/auth-schema";

export const signInAction = async (_: unknown, formData: FormData) => {
  const redirectTo = formData.get("redirect_to")?.toString() || "/dashboard";

  const submission = parseWithZod(formData, {
    schema: loginSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  try {
    await signIn("credentials", {
      email: submission.value.email,
      password: submission.value.password,
      redirect: false,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return submission.reply({
            formErrors: ["メールアドレスまたはパスワードが間違っています"],
          });
        default:
          return submission.reply({
            formErrors: [
              "ログインに失敗しました。入力内容を確認して再度お試し下さい。",
            ],
          });
      }
    }
    console.error("Login error:", error);
    return submission.reply({
      formErrors: [
        "システムエラーが発生しました。しばらく経ってから再度お試しください。",
      ],
    });
  }

  const successUrl = new URL(redirectTo, "http://localhost:3000");
  successUrl.searchParams.set("toast", "login_success");

  redirect(successUrl.pathname + successUrl.search);
};
