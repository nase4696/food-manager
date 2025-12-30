import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SignupForm } from "@/features/auth/components/signup-form";
import { OAuthButtons } from "@/features/auth/components/oauth-button";

type RegisterPageProps = {
  searchParams?: {
    redirect_to?: string;
  };
};

export default function Register({ searchParams }: RegisterPageProps) {
  const redirectTo = searchParams?.redirect_to;
  const oauthRedirectTo = redirectTo || "/dashboard";
  const signupRedirectTo = redirectTo || "/home";
  return (
    <div className="container mx-auto h-auto flex items-center justify-center py-4 md:py-12 px-2 md:px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">新規登録</CardTitle>
          <CardDescription className="text-center">
            アカウントを作成してください
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <OAuthButtons redirectTo={oauthRedirectTo} />
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                または
              </span>
            </div>
          </div>
          <SignupForm redirectTo={signupRedirectTo} />
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-sm text-muted-foreground text-center">
            既にアカウントをお持ちの方は
            <Link className="text-green-500 hover:underline ml-1" href="/login">
              ログイン
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
