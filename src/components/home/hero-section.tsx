import Link from "next/link";

import { Button } from "../ui/button";

import { SimpleFeatures } from "./simple-features";

export function HeroSection() {
  return (
    <section className="container min-h-screen mx-auto px-4 py-4 md:py-16 text-center">
      <h1 className="text-xl md:text-5xl lg:text-6xl font-bold text-green-900 mb-3 md:mb-6">
        食品管理で
        <span className="text-green-500 block">スマートに</span>
      </h1>
      <p className="text-xs md:text-base text-gray-600 mb-8 max-w-2xl mx-auto">
        FreshKeeperを使うことで食品の期限を管理することができ、フードロス削減、食費の節約につながります。
      </p>
      <div className="flex flex-col gap-4 max-w-xs justify-items-center mx-auto md:flex-row">
        <Button asChild className="w-full md:flex-1" size="lg" variant="green">
          <Link href="/register">無料ではじめる</Link>
        </Button>
        <Button
          asChild
          className="w-full md:flex-1"
          size="lg"
          variant="outline"
        >
          <Link href="/login">ログイン</Link>
        </Button>
        <Link
          aria-label="簡単な特徴紹介へスクロール"
          className="text-sm md:hidden hover:underline active:underline"
          href="#simple-features"
        >
          アプリの特徴について
        </Link>
      </div>
      <div className="hidden md:flex">
        <SimpleFeatures />
      </div>
    </section>
  );
}
