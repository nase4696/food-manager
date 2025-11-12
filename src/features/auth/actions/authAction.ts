"use server";

import { parseWithZod } from "@conform-to/zod";
import { redirect } from "next/navigation.js";
import { AuthError } from "next-auth";
import bcrypt from "bcryptjs";

import { signIn } from "@/auth";
import { prisma } from "@/lib/prisma";
import { env } from "@/env";
import { UserCreate } from "@/lib/user/user-data-fetcher";

import { loginSchema, signupSchema } from "../validations/auth-schema";

export const LoginAction = async (_: unknown, formData: FormData) => {
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

export const SignupAction = async (_: unknown, formData: FormData) => {
  const from = formData.get("redirect_to")?.toString() || "/home";

  const submission = parseWithZod(formData, {
    schema: signupSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const { name, email, password } = submission.value;

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return submission.reply({
        formErrors: ["このメールアドレスはすでに登録されています"],
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await UserCreate({ name, email, hashedPassword });

    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
  } catch (error) {
    if (env.NODE_ENV !== "production") console.error("Signup error:", error);

    return submission.reply({
      formErrors: [
        "システムエラーが発生しました。しばらく経ってから再度お試しください。",
      ],
    });
  }

  const successUrl = new URL(from, "http://localhost:3000");
  successUrl.searchParams.set("toast_code", "register_success");

  redirect(successUrl.pathname + successUrl.search);
};
