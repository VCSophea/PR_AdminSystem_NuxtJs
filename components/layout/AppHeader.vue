<script setup lang="ts">
import { useLayoutStore } from "~/stores/layout.store";
import { MENU_CONSTANT } from "~/utils/menu";

const layoutStore = useLayoutStore();
const { isDark, toggleDark } = useTheme();
const route = useRoute();

// * Language state
const currentLang = ref("EN");
const toggleLang = () => (currentLang.value = currentLang.value === "EN" ? "KH" : "EN");

// * Dynamic Breadcrumbs
const breadcrumbs = computed(() => {
  const crumbs = [{ label: "Dashboard", path: "/" }];
  for (const group of MENU_CONSTANT) {
    const item = group.items.find((i) => i.path === route.path);
    if (item && item.moduleName !== "dashboard") {
      if (group.title) crumbs.push({ label: group.title, path: group.items[0]?.path || "/" });
      crumbs.push({ label: item.label, path: item.path });
      break;
    }
  }
  return crumbs;
});
</script>

<template>
  <header class="h-14 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex items-center justify-between px-3 shrink-0 z-40 transition-colors duration-300">
    <!-- Left: Sidebar Toggle & Breadcrumb -->
    <div class="flex items-center gap-1">
      <Button :icon="layoutStore.isSidebarCollapsed ? 'pi pi-bars' : 'pi pi-align-left'" text rounded severity="secondary" @click="layoutStore.toggleSidebar" class="!w-10 !h-10 shrink-0" />

      <div class="h-4 w-px bg-zinc-200 dark:bg-zinc-800 mx-2"></div>

      <!-- Dynamic Breadcrumbs -->
      <nav class="flex items-center gap-1 text-[13px] font-medium overflow-hidden select-none">
        <template v-for="(crumb, idx) in breadcrumbs" :key="crumb.path">
          <NuxtLink :to="crumb.path" class="px-2.5 py-1.5 rounded-lg transition-all whitespace-nowrap" :class="idx === breadcrumbs.length - 1 ? 'text-zinc-900 dark:text-zinc-100 font-bold bg-zinc-100/50 dark:bg-zinc-800/50 pointer-events-none' : 'text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-900'">
            {{ crumb.label }}
          </NuxtLink>
          <i v-if="idx < breadcrumbs.length - 1" class="pi pi-chevron-right text-[10px] text-zinc-300 dark:text-zinc-700 mx-0.5" />
        </template>
      </nav>
    </div>

    <!-- Right: Minimalist Controls -->
    <div class="flex items-center gap-1">
      <Button :label="currentLang" size="small" icon="pi pi-language" @click="toggleLang" severity="secondary" variant="text" raised />
      <Button :label="isDark ? 'Dark' : 'Light'" size="small" :icon="isDark ? 'pi pi-moon' : 'pi pi-sun'" @click="toggleDark" severity="secondary" variant="text" raised />
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
