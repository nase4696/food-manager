export const SITE_CONFIG = {
  title: "Fresh Keeper",
  name: "nase",
  description: "食品管理をスマートにするアプリ FreshKeeper",
  url: "http://localhost:3000",
  ogImage: "",
  links: {
    x: "",
    github: "https://github.com/nase4696",
  },
} as const;

export type SiteConfig = typeof SITE_CONFIG;
