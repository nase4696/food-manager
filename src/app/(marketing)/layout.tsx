import { MarketingFooter } from "@/components/layout/marketing/marketing-footer";
import { MarketingHeader } from "@/components/layout/marketing/marketing-header";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 to-white">
      <MarketingHeader />
      <main className="flex-1">{children}</main>
      <MarketingFooter />
    </div>
  );
}
