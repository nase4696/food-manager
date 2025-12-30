"use client";

import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";

import { signupSchema } from "@/features/auth/validations/auth-schema";
import { Input } from "@/components/ui/input/input";
import { Label } from "@/components/ui/label";
import { LoadingButton } from "@/components/ui/button/loading-button";
import { PasswordInput } from "@/components/ui/input/password-input";

import { useSignupLogic } from "../hooks/use-signup-logic";

type SignupFormProps = {
  redirectTo?: string;
};

export function SignupForm({ redirectTo }: SignupFormProps) {
  const { from, pending, state, formAction } = useSignupLogic(redirectTo);

  const [form, fields] = useForm({
    lastResult: state,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: signupSchema });
    },
    shouldValidate: "onBlur",
  });

  return (
    <form {...getFormProps(form)} action={formAction} className="space-y-4">
      <input name="redirect_to" type="hidden" value={from} />
      <div>
        <Label htmlFor={fields.name.id}>ユーザー名</Label>
        <Input {...getInputProps(fields.name, { type: "text" })} />
        {fields.name.errors && (
          <div className="text-red-500 text-sm" id="name-error" role="alert">
            {fields.name.errors.map((error, index) => (
              <div className="block" key={index}>
                {error}
              </div>
            ))}
          </div>
        )}
      </div>
      <div>
        <Label htmlFor={fields.email.id}>メールアドレス</Label>
        <Input {...getInputProps(fields.email, { type: "email" })} />
        {fields.email.errors && (
          <div className="text-red-500 text-sm" id="email-error" role="alert">
            {fields.email.errors.map((error, index) => (
              <div className="block" key={index}>
                {error}
              </div>
            ))}
          </div>
        )}
      </div>
      <div>
        <Label htmlFor={fields.password.id}>パスワード</Label>
        <PasswordInput
          {...getInputProps(fields.password, { type: "password" })}
        />
        {fields.password.errors && (
          <div
            className="text-red-500 text-sm"
            id="password-error"
            role="alert"
          >
            {fields.password.errors.map((error, index) => (
              <div className="block" key={index}>
                {error}
              </div>
            ))}
          </div>
        )}
      </div>
      <div>
        <Label htmlFor={fields.confirmPassword.id}>確認用パスワード</Label>
        <PasswordInput
          {...getInputProps(fields.confirmPassword, { type: "password" })}
        />
        {fields.confirmPassword.errors && (
          <div
            className="text-red-500 text-sm"
            id="confirmPassword-error"
            role="alert"
          >
            {fields.confirmPassword.errors.map((error, index) => (
              <div className="block" key={index}>
                {error}
              </div>
            ))}
          </div>
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
        loadingText="登録中"
        type="submit"
      >
        登録
      </LoadingButton>
    </form>
  );
}
