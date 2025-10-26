"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icon";

export function OAuthButtons() {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect_to") || "/dashboard";

  const handleOAuthSignIn = (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: redirectTo,
    });
  };

  return (
    <div className="grid grid-cols-1 gap-3">
      <Button
        className="w-full"
        onClick={() => handleOAuthSignIn("google")}
        type="button"
        variant="outline"
      >
        <Icons.google />
        Googleで続行
      </Button>

      <Button
        className="w-full"
        onClick={() => handleOAuthSignIn("github")}
        type="button"
        variant="outline"
      >
        <Icons.github />
        GitHubで続行
      </Button>
    </div>
  );
}
