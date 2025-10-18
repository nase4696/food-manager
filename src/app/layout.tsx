import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";

import "@/styles/globals.css";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

const fontMontserrat = Montserrat({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-heading",
});

const fontInter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.title}`,
  },
  description: siteConfig.description,
  keywords: [
    "食品管理",
    "賞味期限",
    "在庫管理",
    "食費削減",
    "食品ロス削減",
    "冷蔵庫管理",
  ],
  authors: [
    {
      name: siteConfig.name,
      url: siteConfig.url,
    },
  ],
  openGraph: {
    type: "website",
    locale: "ja",
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.title,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    creator: siteConfig.name,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="min-h-screen" lang="ja" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen",
          fontInter.variable,
          fontMontserrat.variable,
          "font-sans",
        )}
      >
        {children}
      </body>
    </html>
  );
}
