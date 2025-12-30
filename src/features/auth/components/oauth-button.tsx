"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

import { Icons } from "@/components/icon";
import { LoadingButton } from "@/components/ui/button/loading-button";

type OAuthButtonsProps = {
  redirectTo?: string;
};

export function OAuthButtons({ redirectTo }: OAuthButtonsProps) {
  const resolvedRedirectTo = redirectTo || "/dashboard";
  const [isLoading, setIsLoading] = useState<"google" | "github" | null>(null);

  const handleOAuthSignIn = async (provider: "google" | "github") => {
    setIsLoading(provider);
    try {
      await signIn(provider, {
        callbackUrl: resolvedRedirectTo,
      });
    } catch (error) {
      console.error(`${provider} login error:`, error);
      setIsLoading(null);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-3">
      <LoadingButton
        className="w-full"
        loading={isLoading === "google"}
        loadingText="Googleで続行"
        onClick={() => handleOAuthSignIn("google")}
        type="button"
        variant="outline"
      >
        <Icons.google />
        Googleで続行
      </LoadingButton>

      <LoadingButton
        className="w-full"
        loading={isLoading === "github"}
        loadingText="GitHubで続行"
        onClick={() => handleOAuthSignIn("github")}
        type="button"
        variant="outline"
      >
        <Icons.github />
        GitHubで続行
      </LoadingButton>
    </div>
  );
}
