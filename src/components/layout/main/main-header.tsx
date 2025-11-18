"use client";

import { usePathname, useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

const pageTitles: Record<string, string> = {
  "/dashboard": "ダッシュボード",
  "/products/new": "食品登録",
  "/products": "食品確認",
  "/settings": "設定",
};

export function MainHeader() {
  const { state } = useSidebar();
  const pathname = usePathname();
  const router = useRouter();

  const currentTitle = pageTitles[pathname] || "FreshKeeper";

  const isDashboard = pathname === "/dashboard";

  return (
    <header className="container mx-auto flex items-center gap-2 px-2 md:px-4 py-3">
      <div className="grid grid-cols-3 w-full items-center md:hidden">
        <div className="flex justify-start">
          {!isDashboard && (
            <Button
              aria-label="前のページに戻る"
              onClick={() => router.back()}
              size="icon"
              variant="ghost"
            >
              <ChevronLeft className="w-10! h-10!" />
            </Button>
          )}
        </div>
        <div className="flex justify-center">
          <h1 className="text-lg font-semibold text-nowrap text-center">
            {currentTitle}
          </h1>
        </div>
      </div>
      {state === "collapsed" && (
        <div className="hidden md:flex items-center gap-2">
          <SidebarTrigger />
          <h1 className="text-xl font-semibold">FreshKeeper</h1>
        </div>
      )}
    </header>
  );
}
