import { useState } from "react";

import { cn } from "@/lib/utils";
import { Icons } from "@/components/icon";

import { Input } from "./input";

type PasswordInputProps = React.ComponentProps<"input">;

export function PasswordInput({ className, ...props }: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { type: _, ...restProps } = props;

  return (
    <div className="relative">
      <Input
        className={cn("pr-10", className)}
        type={showPassword ? "text" : "password"}
        {...restProps}
      />
      <button
        aria-label={showPassword ? "パスワードを非表示" : "パスワードを表示"}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
        onClick={() => setShowPassword(!showPassword)}
        type="button"
      >
        {showPassword ? (
          <Icons.passwordOpen className="h-4 w-4" />
        ) : (
          <Icons.passwordClose className="h-4 w-4" />
        )}
      </button>
    </div>
  );
}
