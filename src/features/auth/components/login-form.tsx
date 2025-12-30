"use client";

import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";

import { loginSchema } from "@/features/auth/validations/auth-schema";
import { Input } from "@/components/ui/input/input";
import { Label } from "@/components/ui/label";
import { LoadingButton } from "@/components/ui/button/loading-button";
import { PasswordInput } from "@/components/ui/input/password-input";

import { useLoginLogic } from "../hooks/use-login-logic";

type LoginFormProps = {
  redirectTo?: string;
};

export function LoginForm({ redirectTo }: LoginFormProps) {
  const { from, pending, state, formAction } = useLoginLogic(redirectTo);

  const [form, fields] = useForm({
    lastResult: state,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: loginSchema });
    },
    shouldValidate: "onBlur",
  });

  return (
    <form {...getFormProps(form)} action={formAction} className="space-y-4">
      <input name="redirect_to" type="hidden" value={from} />
      <div>
        <Label htmlFor={fields.email.id}>メールアドレス</Label>
        <Input {...getInputProps(fields.email, { type: "email" })} />
        {fields.email.errors && (
          <p className="text-red-500 text-sm" id="email-error" role="alert">
            {fields.email.errors}
          </p>
        )}
      </div>
      <div>
        <Label htmlFor={fields.password.id}>パスワード</Label>
        <PasswordInput
          {...getInputProps(fields.password, { type: "password" })}
        />
        {fields.password.errors && (
          <p className="text-red-500 text-sm" id="password-error" role="alert">
            {fields.password.errors}
          </p>
        )}
      </div>
      {form.errors && (
        <div className="text-red-500 text-sm text-center" role="alert">
          <ul>
            {form.errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </div>
      )}
      <LoadingButton
        className="w-full my-3"
        loading={pending}
        loadingText="ログイン"
        type="submit"
      >
        ログイン
      </LoadingButton>
    </form>
  );
}
