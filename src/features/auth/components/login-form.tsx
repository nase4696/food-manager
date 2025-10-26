"use client";

import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";

import { loginSchema } from "@/features/auth/validations/auth-schema";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoadingButton } from "@/components/ui/button/loading-button";

import { useLoginLogic } from "../hooks/use-login-logic";

export function LoginForm() {
  const { from, pending, state, formAction } = useLoginLogic();

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
        <Input
          {...getInputProps(fields.email, { type: "email" })}
          key={fields.email.key}
        />
        {fields.email.errors && (
          <p className="text-red-500 text-sm" role="alert">
            {fields.email.errors}
          </p>
        )}
      </div>
      <div>
        <Label htmlFor={fields.password.id}>パスワード</Label>
        <Input
          {...getInputProps(fields.password, { type: "password" })}
          key={fields.password.key}
        />
        {fields.password.errors && (
          <p className="text-red-500 text-sm" role="alert">
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
