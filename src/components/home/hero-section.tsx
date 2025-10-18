import Link from "next/link";

import { Button } from "../ui/button";

export function HeroSection() {
  return (
    <section className="container mx-auto px-4 py-8 md:py-16 text-center">
      <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-green-900 mb-6">
        食品管理を
        <span className="text-green-500 block">スマートに</span>
      </h1>
      <p className="text-base text-gray-600 mb-8 max-w-2xl mx-auto md:text-xl">
        冷蔵庫の中身を把握して、フードロスを減らしましょう。
        賞味期限を管理することで食費の節約にもつながります。
      </p>
      <div className="flex flex-col gap-4 max-w-xs mx-auto sm:flex-row">
        <Button asChild className="bg-green-500 hover:bg-green-600" size="lg">
          <Link href="/register">無料ではじめる</Link>
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link href="/about">詳しく見る</Link>
        </Button>
      </div>

      <div className="mt-16 bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-green-100 rounded-lg p-4 text-center">
            <div className="text-3xl mb-2">👛</div>
            <h3 className="font-semibold text-sm md:text-base">費用低減</h3>
            <p className="text-sm text-gray-600">余計な食費を抑える</p>
          </div>
          <div className="bg-orange-100 rounded-lg p-4 text-center">
            <div className="text-3xl mb-2">⏰</div>
            <h3 className="font-semibold text-sm md:text-base">期限通知</h3>
            <p className="text-sm text-gray-600">忘れずに消費</p>
          </div>
          <div className="bg-blue-100 rounded-lg p-4 text-center">
            <div className="text-3xl mb-2">📊</div>
            <h3 className="font-semibold text-sm md:text-base">在庫管理</h3>
            <p className="text-sm text-gray-600">一目で把握</p>
          </div>
        </div>
      </div>
    </section>
  );
}
