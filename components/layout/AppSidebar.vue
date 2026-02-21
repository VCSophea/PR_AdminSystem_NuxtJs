<!-- components/layout/AppSidebar.vue -->
<script setup lang="ts">
// * Imports & Stores
const layoutStore = useLayoutStore();
const authStore = useAuthStore();
const { hasPermission } = usePermission();
const { logout } = useAuth();
const { isDark } = useTheme();

// * Reactive Pulse
const searchQuery = ref("");
const isHovered = ref(false);
const showProfileMenu = ref(false);
const isExpanded = computed(() => !layoutStore.isSidebarCollapsed || isHovered.value);

// * Navigation Topology
const menuGroups = [
  {
    title: "Platform",
    items: [
      { label: "Dashboard", icon: "mdi:view-dashboard", path: "/", type: "Dashboard" },
      { label: "Lifecycle", icon: "mdi:refresh", path: "/lifecycle", type: "Dashboard" },
      { label: "Analytics", icon: "mdi:chart-bar", path: "/analytics", type: "Dashboard" },
    ],
  },
  {
    title: "Documents",
    items: [
      { label: "Company", icon: "mdi:office-building", path: "/company", type: "Company" },
      { label: "News Feed", icon: "mdi:newspaper", path: "/news-feed", type: "NewsFeed" },
      { label: "FAQ", icon: "mdi:help-circle", path: "/faq", type: "FAQ" },
    ],
  },
  {
    title: "Vehicle & Policy",
    items: [
      { label: "Vehicle Type", icon: "mdi:car", path: "/vehicle-type", type: "VehicleType" },
      { label: "Coverage Category", icon: "mdi:shield-check", path: "/coverage-category", type: "CoverageCategory" },
      { label: "Price Type", icon: "mdi:currency-usd", path: "/price-type", type: "PriceType" },
    ],
  },
  {
    title: "System Setting",
    items: [
      { label: "Customer", icon: "mdi:account-group", path: "/customer", type: "Customer" },
      { label: "Customer Type", icon: "mdi:account-badge", path: "/customer-type", type: "CustomerType" },
      { label: "Service Type", icon: "mdi:tools", path: "/service-type", type: "ServiceType" },
      { label: "Settings", icon: "mdi:cog", path: "/settings", type: "Dashboard" },
    ],
  },
];

// * Filter Engine
const filteredGroups = computed(() =>
  menuGroups
    .map((g) => ({
      ...g,
      items: g.items.filter((i) => hasPermission(i.type) && i.label.toLowerCase().includes(searchQuery.value.toLowerCase())),
    }))
    .filter((g) => g.items.length > 0),
);
</script>

<template>
  <!-- Layout Placeholder (Reserves space so content doesn't jump) -->
  <div class="shrink-0 transition-all duration-300 ease-in-out" :class="layoutStore.isSidebarCollapsed ? 'w-20' : 'w-64'"></div>

  <!-- Actual Sidebar (Fixed Drawer) -->
  <aside
    class="sidebar fixed left-0 top-0 h-screen flex flex-col border-r transition-all duration-300 ease-in-out z-50 overflow-hidden"
    :class="[isExpanded ? 'w-64' : 'w-20', isDark ? 'bg-[var(--sidebar-bg)] border-[var(--sidebar-border)] text-zinc-100' : 'text-zinc-900 border-white/20']"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
    :style="!isDark ? { background: 'var(--glass-bg)', backdropFilter: 'blur(var(--glass-blur))', boxShadow: 'var(--glass-card-shadow), var(--glass-inset-shadow)' } : {}"
  >
    <!-- Logo & Static Banner -->
    <div class="h-16 flex items-center px-4 shrink-0 border-b border-[var(--sidebar-border)] overflow-hidden">
      <div class="flex items-center gap-3 px-2">
        <div class="w-8 h-8 rounded bg-[var(--color-primary)] flex items-center justify-center shrink-0">
          <Icon name="mdi:alpha-c-box" class="text-white w-6 h-6" />
        </div>
        <div class="flex flex-col min-w-0 flex-1 transition-all duration-300 ease-in-out" :class="!isExpanded ? 'opacity-0 invisible -translate-x-4 pointer-events-none' : 'opacity-100 visible translate-x-0'">
          <span class="text-sm font-bold text-zinc-900 dark:text-white tracking-tight leading-none whitespace-nowrap">CITOM ADMIN</span>
          <span class="text-[10px] text-zinc-500 font-medium whitespace-nowrap">Enterprise Suite</span>
        </div>
      </div>
    </div>

    <!-- Menu Search Input -->
    <div class="px-4 mt-6 shrink-0 overflow-hidden">
      <div class="relative flex items-center group">
        <Icon name="mdi:magnify" class="absolute left-3 w-4 h-4 text-zinc-400 dark:text-zinc-500 transition-colors group-focus-within:text-[var(--color-primary)]" />
        <input v-model="searchQuery" type="text" placeholder="Search menu..." class="w-full bg-white/70 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg py-1.5 pl-9 pr-3 text-xs text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)] transition-all duration-300" :class="!isExpanded ? 'opacity-0 invisible pointer-events-none' : 'opacity-100 visible'" />
        <!-- Collapsed Search Icon (Overlay when collapsed) -->
        <div v-if="!isExpanded" class="absolute inset-0 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900 flex items-center justify-center cursor-pointer transition-all duration-300" @click="layoutStore.toggleSidebar">
          <Icon name="mdi:magnify" class="w-5 h-5 text-zinc-500" />
        </div>
      </div>
    </div>

    <!-- Grouped Navigation -->
    <nav class="flex-1 overflow-y-auto py-6 px-3 scrollbar-hide space-y-7">
      <div v-for="group in filteredGroups" :key="group.title" class="space-y-1.5">
        <!-- Group Title -->
        <h3 class="px-3 text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-[0.15em] mb-2.5 transition-all duration-300 overflow-hidden whitespace-nowrap" :class="!isExpanded ? 'opacity-0 h-0 my-0' : 'opacity-100 h-auto my-0'">
          {{ group.title }}
        </h3>

        <!-- Group Items -->
        <div class="space-y-0.5">
          <NuxtLink v-for="item in group.items" :key="item.path" :to="item.path" class="nav-link group flex items-center rounded-lg transition-all duration-200 relative overflow-hidden h-9" :class="[!isExpanded ? 'justify-center w-9 mx-auto px-0' : 'gap-3 px-3']">
            <Icon :name="item.icon" class="w-4.5 h-4.5 shrink-0 transition-colors duration-200" :class="['text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-zinc-200 group-[.router-link-active]:text-[var(--sidebar-text-active)]']" />
            <span class="text-[13px] font-medium whitespace-nowrap transition-all duration-300 flex-1" :class="!isExpanded ? 'opacity-0 invisible w-0 -translate-x-2' : 'opacity-100 visible translate-x-0 ml-1'">
              {{ item.label }}
            </span>
          </NuxtLink>
        </div>
      </div>

      <!-- No Results -->
      <div v-if="filteredGroups.length === 0" class="px-3 text-xs text-zinc-400 italic">No matching menus found</div>
    </nav>

    <!-- Bottom Profile -->
    <div class="px-4 py-4 border-t border-[var(--sidebar-border)] transition-colors duration-300" :class="isDark ? 'bg-[var(--sidebar-bg)]' : 'bg-transparent'">
      <div class="flex items-center p-2 rounded-lg hover:bg-zinc-100/50 dark:hover:bg-zinc-900 cursor-pointer transition-colors relative" :class="!isExpanded ? 'justify-center mx-auto w-10' : 'gap-3'" @click="showProfileMenu = !showProfileMenu">
        <div class="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center shrink-0 border border-zinc-200 dark:border-zinc-700 overflow-hidden">
          <img v-if="authStore.user?.photo" :src="authStore.user.photo" class="w-full h-full object-cover" />
          <Icon v-else name="mdi:account" class="text-zinc-400 w-5 h-5" />
        </div>

        <div class="flex flex-col min-w-0 flex-1 transition-all duration-300 overflow-hidden" :class="!isExpanded ? 'opacity-0 invisible w-0 -translate-x-2' : 'opacity-100 visible translate-x-0 ml-1'">
          <span class="text-[11px] font-bold text-zinc-900 dark:text-zinc-100 truncate leading-tight whitespace-nowrap">{{ authStore.user?.username || "shadcn" }}</span>
          <span class="text-[10px] text-zinc-500 truncate leading-tight whitespace-nowrap font-medium">{{ authStore.user?.email || "m@example.com" }}</span>
        </div>

        <Icon name="mdi:chevron-up" class="w-4 h-4 text-zinc-400 transition-all duration-300" :class="!isExpanded ? 'opacity-0 invisible w-0 scale-0' : 'opacity-100 visible scale-100'" />

        <!-- Popout Menu -->
        <div v-if="showProfileMenu" class="absolute bottom-full left-0 mb-2 w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.5)] p-2 z-[60] animate-in fade-in slide-in-from-bottom-2 duration-300">
          <button @click.stop="logout" class="flex items-center gap-2 w-full px-3 py-2.5 text-xs text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors font-medium">
            <Icon name="mdi:logout-variant" class="w-4 h-4" />
            Log out
          </button>
        </div>
      </div>
    </div>
  </aside>
</template>

<style scoped>
.nav-link {
  color: var(--sidebar-text);
}
.nav-link:hover {
  background-color: var(--sidebar-accent);
  color: var(--sidebar-text-active);
}
.nav-link.router-link-active {
  background-color: var(--sidebar-accent);
  color: var(--sidebar-text-active);
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
