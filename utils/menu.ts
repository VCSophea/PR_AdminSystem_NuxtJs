export interface MenuItem {
  label: string;
  icon: string;
  path: string;
  moduleName: string;
}

export interface MenuGroup {
  title: string;
  items: MenuItem[];
}

export const MENU_CONSTANT: MenuGroup[] = [
  {
    title: "",
    items: [
      {
        label: "Dashboard",
        icon: "mdi:view-dashboard",
        path: "/",
        moduleName: "dashboard",
      },
      {
        label: "Product",
        icon: "mdi:package-variant-closed",
        path: "/product",
        moduleName: "users",
      },
      {
        label: "Coverage",
        icon: "mdi:shield-check",
        path: "/coverage",
        moduleName: "users",
      },
    ],
  },
  {
    title: "Master Data",
    items: [
      {
        label: "Company",
        icon: "mdi:office-building",
        path: "/company",
        moduleName: "company",
      },
      {
        label: "Product Category",
        icon: "mdi:shape",
        path: "/product-category",
        moduleName: "product-category",
      },
      {
        label: "Price Type",
        icon: "mdi:tag-multiple",
        path: "/price-type",
        moduleName: "price-type",
      },
      {
        label: "Coverage Category",
        icon: "mdi:shield-outline",
        path: "/coverage-category",
        moduleName: "coverage-category",
      },
      {
        label: "Vehicle Type",
        icon: "mdi:car",
        path: "/vehicle-type",
        moduleName: "vehicle-type",
      },
      {
        label: "Deductible",
        icon: "mdi:calculator",
        path: "/deductible",
        moduleName: "deductible",
      },
      {
        label: "Exclusion",
        icon: "mdi:close-octagon",
        path: "/exclusion",
        moduleName: "exclusion",
      },
    ],
  },
  {
    title: "Report",
    items: [
      {
        label: "Clients",
        icon: "mdi:account-details",
        path: "/clients",
        moduleName: "customer",
      },
      {
        label: "Sales",
        icon: "mdi:chart-line",
        path: "/sales",
        moduleName: "report",
      },
    ],
  },
  {
    title: "System Configuration",
    items: [
      {
        label: "Promotion",
        icon: "mdi:bullhorn",
        path: "/promotion",
        moduleName: "slide-show",
      },
      {
        label: "News Feed",
        icon: "mdi:newspaper",
        path: "/news-feed",
        moduleName: "new-feed",
      },
      {
        label: "FAQ",
        icon: "mdi:help-circle",
        path: "/faq",
        moduleName: "faq",
      },
      {
        label: "Contact Us",
        icon: "mdi:headset",
        path: "/contact-us",
        moduleName: "customer-support",
      },
      {
        label: "About Us",
        icon: "mdi:information",
        path: "/about-us",
        moduleName: "about-us",
      },
      {
        label: "Terms & Privacy",
        icon: "mdi:file-document-edit",
        path: "/terms-privacy",
        moduleName: "privacy-policy",
      },
      {
        label: "System/Role",
        icon: "mdi:shield-lock",
        path: "/system-roles",
        moduleName: "system-roles",
      },
      {
        label: "User",
        icon: "mdi:account",
        path: "/users",
        moduleName: "users",
      },
    ],
  },
];
