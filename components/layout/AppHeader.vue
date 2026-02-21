<!-- components/layout/AppHeader.vue -->
<script setup lang="ts">
import { useLayoutStore } from "~/stores/layout.store";

const layoutStore = useLayoutStore();
const { isDark, toggleDark } = useTheme();
const route = useRoute();

// * Language state
const currentLang = ref("EN");
const toggleLang = () => {
  currentLang.value = currentLang.value === "EN" ? "KH" : "EN";
};
</script>

<template>
  <header class="h-14 border-b border-[var(--color-border)] bg-[var(--color-bg)] flex items-center justify-between px-4 shrink-0 transition-colors duration-300 z-40">
    <!-- Left: Sidebar Toggle & Breadcrumb -->
    <div class="flex items-center gap-3">
      <button @click="layoutStore.toggleSidebar" class="group p-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all duration-200" aria-label="Toggle Sidebar">
        <Icon :name="layoutStore.isSidebarCollapsed ? 'mdi:menu-open' : 'mdi:menu'" class="w-5 h-5 text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors" />
      </button>

      <div class="h-4 w-px bg-zinc-200 dark:bg-zinc-800 mx-1"></div>

      <!-- Breadcrumb -->
      <nav class="flex items-center gap-2 text-sm select-none">
        <span class="text-zinc-500 font-medium">Dashboard</span>
        <Icon name="mdi:chevron-right" class="w-4 h-4 text-zinc-300 dark:text-zinc-700" />
        <span class="font-bold text-zinc-900 dark:text-zinc-100 capitalize">{{ route.name || "Overview" }}</span>
      </nav>
    </div>

    <!-- Right: Minimalist Controls -->
    <div class="flex items-center gap-2">
      <!-- Language Switcher -->
      <button @click="toggleLang" class="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 bg-white/50 dark:bg-zinc-900/50 hover:bg-zinc-50 dark:hover:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-100 transition-all duration-200">
        <Icon name="mdi:translate" class="w-3.5 h-3.5 opacity-70" />
        {{ currentLang }}
      </button>

      <!-- Theme Toggle -->
      <button @click="toggleDark" class="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 bg-white/50 dark:bg-zinc-900/50 hover:bg-zinc-50 dark:hover:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-100 transition-all duration-200">
        <Icon :name="isDark ? 'mdi:weather-sunny' : 'mdi:weather-night'" class="w-3.5 h-3.5 transition-transform duration-500" :class="isDark ? 'rotate-0' : 'rotate-12'" />
        {{ isDark ? "Dark" : "Light" }}
      </button>
    </div>
  </header>
</template>

<style scoped>
header {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}
</style>
