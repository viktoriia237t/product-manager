export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Products Manager",
  description: "Product Manager",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Products",
      href: "/products",
    },
  ],
};
