import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";

import "@/styles/globals.css";
import { SITE_CONFIG } from "@/constants/site";
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
    default: SITE_CONFIG.title,
    template: `%s | ${SITE_CONFIG.title}`,
  },
  description: SITE_CONFIG.description,
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
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
    },
  ],
  openGraph: {
    type: "website",
    locale: "ja",
    url: SITE_CONFIG.url,
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    siteName: SITE_CONFIG.title,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    creator: SITE_CONFIG.name,
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
