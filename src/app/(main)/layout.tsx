import { MainSidebar } from "@/components/main/main-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { BottomNavigation } from "@/components/main/bottom-navigation";
import { MainHeader } from "@/components/layout/main/main-header";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background flex w-full">
        <div className="hidden md:block">
          <MainSidebar />
        </div>
        <div className="flex-1 flex flex-col items-center">
          <div className="w-full max-w-6xl">
            <MainHeader />
            <main className="flex-1 pt-2 pb-16 md:pb-0">{children}</main>
          </div>
          <div className="md:hidden">
            <BottomNavigation />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
