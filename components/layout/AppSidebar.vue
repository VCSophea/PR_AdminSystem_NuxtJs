<!-- components/layout/AppSidebar.vue -->
<script setup lang="ts">
const { hasPermission } = usePermission();

// Map each menu item to the 'type' value from your API
const menuItems = [
  {
    label: "Dashboard",
    icon: "mdi:view-dashboard",
    path: "/",
    type: "Dashboard",
  },
  {
    label: "Company",
    icon: "mdi:office-building",
    path: "/company",
    type: "Company",
  },
  {
    label: "Product Category",
    icon: "mdi:tag-multiple",
    path: "/product-category",
    type: "ProductCategory",
  },
  {
    label: "Price Type",
    icon: "mdi:currency-usd",
    path: "/price-type",
    type: "PriceType",
  },
  {
    label: "Coverage Category",
    icon: "mdi:shield-check",
    path: "/coverage-category",
    type: "CoverageCategory",
  },
  {
    label: "Vehicle Type",
    icon: "mdi:car",
    path: "/vehicle-type",
    type: "VehicleType",
  },
  {
    label: "Clients",
    icon: "mdi:account-group",
    path: "/clients",
    type: "Clients",
  },
  {
    label: "Sales",
    icon: "mdi:chart-line",
    path: "/sales",
    type: "Sales",
  },
  {
    label: "Promotion",
    icon: "mdi:bullhorn",
    path: "/promotion",
    type: "Promotion",
  },
  {
    label: "News Feed",
    icon: "mdi:newspaper",
    path: "/news-feed",
    type: "NewsFeed",
  },
  {
    label: "FAQ",
    icon: "mdi:help-circle",
    path: "/faq",
    type: "FAQ",
  },
  {
    label: "Contact Us",
    icon: "mdi:phone",
    path: "/contact-us",
    type: "ContactUs",
  },
  {
    label: "About Us",
    icon: "mdi:information",
    path: "/about-us",
    type: "AboutUs",
  },
];

// Only show items the user has permission for
const visibleMenu = computed(() => menuItems.filter((item) => hasPermission(item.type)));
</script>

<template>
  <aside class="app-sidebar w-56 flex flex-col shrink-0">
    <div class="p-4 flex items-center justify-center border-b border-white/10">
      <img src="~/assets/images/logo.png" alt="Logo" class="app-logo" />
    </div>
    <nav class="flex-1 overflow-y-auto py-4">
      <NuxtLink v-for="item in visibleMenu" :key="item.path" :to="item.path" class="flex items-center gap-3 px-4 py-2.5 text-sm transition-colors hover:bg-white/10 rounded-lg mx-2 [&.router-link-active]:bg-white/20 [&.router-link-active]:font-semibold">
        <Icon :name="item.icon" class="text-lg shrink-0" />
        <span>{{ item.label }}</span>
      </NuxtLink>
    </nav>
  </aside>
</template>
