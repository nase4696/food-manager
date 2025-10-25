import { z } from "zod";

export const loginSchema = z.object({
  email: z.preprocess(
    (value) => {
      if (typeof value === "string") return value.trim();
      return "";
    },
    z
      .string({ required_error: "メールアドレスを入力して下さい" })
      .email({ message: "メールアドレスの形式が不正です" })
      .min(1, { message: "メールアドレスを入力して下さい" }),
  ),

  password: z.preprocess(
    (value) => {
      if (typeof value === "string") return value;
      return "";
    },
    z
      .string({ required_error: "パスワードを入力して下さい" })
      .min(1, { message: "パスワードを入力して下さい" }),
  ),
});

export type SignInInputs = z.infer<typeof loginSchema>;
