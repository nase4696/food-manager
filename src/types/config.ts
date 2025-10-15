export type NavItem = {
  title: string;
  href: string;
  disabled?: boolean;
};

export type MainNavConfig = {
  mainNav: NavItem[];
};

export type MobileNavConfig = {
  mobileNav: NavItem[];
};

export type SiteConfig = {
  title: string;
  name: string;
  description: string;
  url: string;
  ogImage: string;
  links?: {
    x: string;
    github: string;
  };
};

export type CategoryConfig = {
  id: string;
  name: string;
  description: string;
  color: string;
  defaultExpiryDays: number;
};
