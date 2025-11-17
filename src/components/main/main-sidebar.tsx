"use client";

import {
  Home,
  PlusCircle,
  Search,
  Settings,
  PanelLeftIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  useSidebar,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";

import { Button } from "../ui/button";

const navItems = [
  { title: "ダッシュボード", url: "/dashboard", icon: Home },
  { title: "食品登録", url: "/products/new", icon: PlusCircle },
  { title: "食品確認", url: "/products", icon: Search },
  { title: "設定", url: "/settings", icon: Settings },
];

export function MainSidebar() {
  const { setOpen } = useSidebar();
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center justify-between px-2">
          <span className="text-lg font-bold">FreshKeeper</span>
          <Button
            aria-label="サイドバーを閉じる"
            className="hidden md:flex size-7"
            onClick={() => setOpen(false)}
            size="icon"
            variant="ghost"
          >
            <PanelLeftIcon className="w-5 h-5" />
          </Button>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>ナビゲーション</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const isActive = pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={isActive}>
                      <Link className="flex items-center gap-3" href={item.url}>
                        <item.icon className="w-5 h-5" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
