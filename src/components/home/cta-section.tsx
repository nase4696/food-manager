// components/home/cta-section.tsx
import Link from "next/link";

import { Button } from "@/components/ui/button/button";

export function CtaSection() {
  return (
    <section className="py-12 md:py-20 bg-gradient-to-r from-green-400 to-green-600">
      <div className="container max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-xl md:text-3xl font-bold text-white mb-4 md:mb-6">
          今すぐ食品管理を始めよう
        </h2>
        <p className="text-sm md:text-base text-green-100 mb-6 md:mb-8 max-w-2xl mx-auto">
          食品管理でスマートに。フードロス削減と食費節約を実現する
          FreshKeeperを今すぐお試しください。
        </p>

        <div className="flex flex-col md:flex-row gap-4 max-w-xs mx-auto justify-items-center">
          <Button
            asChild
            className="bg-white text-green-600 hover:bg-green-100 active:bg-green-100 w-full md:flex-1 text-sm md:text-base py-3 md:py-2"
            size="lg"
          >
            <Link href="/register">無料ではじめる</Link>
          </Button>

          <Button
            asChild
            className="border-white text-gray-600 w-full md:flex-1 text-sm md:text-base py-3 md:py-2"
            size="lg"
            variant="outline"
          >
            <Link href="/login">ログイン</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
