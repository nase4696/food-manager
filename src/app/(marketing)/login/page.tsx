import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LoginForm } from "@/features/auth/components/login-form";
import { OAuthButtons } from "@/features/auth/components/oauth-button";

type LoginPageProps = {
  searchParams?: {
    redirect_to?: string;
  };
};

export default function Login({ searchParams }: LoginPageProps) {
  const redirectTo = searchParams?.redirect_to || "/dashboard";
  return (
    <div className="container mx-auto h-auto flex items-center justify-center py-4 md:py-12 px-2 md:px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">ログイン</CardTitle>
          <CardDescription className="text-center">
            アカウントにログインしてください
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <OAuthButtons redirectTo={redirectTo} />
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
          <LoginForm redirectTo={redirectTo} />
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-sm text-muted-foreground text-center">
            アカウントをお持ちでない方は
            <Link
              className="text-green-500 hover:underline ml-1"
              href="/register"
            >
              新規登録
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
