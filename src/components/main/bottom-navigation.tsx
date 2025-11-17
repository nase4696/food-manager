"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, PlusCircle, Search, Settings } from "lucide-react";

import { cn } from "@/lib/utils";

const navItems = [
  { title: "ホーム", url: "/dashboard", icon: Home },
  { title: "登録", url: "/products/new", icon: PlusCircle },
  { title: "確認", url: "/products", icon: Search },
  { title: "設定", url: "/settings", icon: Settings },
];

export function BottomNavigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center h-16 safe-area-inset-bottom">
      {navItems.map((item) => {
        const isActive = pathname === item.url;

        return (
          <Link
            className={cn(
              "flex flex-col items-center justify-center w-16 h-16 transition-colors",
              isActive ? "text-green-600" : "text-gray-500 hover:text-gray-700",
            )}
            href={item.url}
            key={item.title}
          >
            <item.icon
              className={cn(
                "w-6 h-6 transition-transform",
                isActive && "scale-110",
              )}
            />
            <span className="text-xs mt-1 font-medium">{item.title}</span>

            {isActive && (
              <div className="absolute top-0 w-1 h-1 bg-green-600 rounded-full" />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
