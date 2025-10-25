"use client";

import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";

import { loginSchema } from "@/features/auth/validations/auth-schema";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

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
        {(() => {
          const props = getInputProps(fields.email, { type: "email" });
          const { key, ...inputProps } = props;
          return <Input key={key} {...inputProps} />;
        })()}
        {fields.email.errors && (
          <p className="text-red-500 text-sm">{fields.email.errors}</p>
        )}
      </div>
      <div>
        <Label htmlFor={fields.password.id}>パスワード</Label>
        <Input id={fields.password.id} name={fields.password.name} />
        {fields.password.errors && (
          <p className="text-red-500 text-sm">{fields.password.errors}</p>
        )}
      </div>
      {form.errors && (
        <div
          className="text-red-500 text-sm text-center"
          data-testid="error-container"
        >
          <ul>
            {form.errors.map((error) => (
              <li key={error} role="alert">
                {error}
              </li>
            ))}
          </ul>
        </div>
      )}
      <Button
        className="w-full my-3"
        data-testid="login-button"
        disabled={pending}
        type="submit"
      >
        ログイン
      </Button>
    </form>
  );
}
