<script setup lang="ts">
import { computed } from "vue";
import { usePermission } from "~/composables/usePermission";
import { MENU_CONSTANT } from "~/utils/menu";

interface Props {
  isExpanded: boolean;
  searchQuery: string;
}

const props = defineProps<Props>();
const { hasPermission } = usePermission();

// * Applying Search & Permission Filters
const filteredGroups = computed(() => {
  return MENU_CONSTANT.map((g) => ({
    ...g,
    items: g.items.filter((i) => {
      // * Permission check: bypass for dashboard or dynamic check for modules
      const hasViewPermission = i.moduleName === "dashboard" || hasPermission(i.moduleName, "VIEW");
      const matchesSearch = i.label.toLowerCase().includes(props.searchQuery.toLowerCase());
      return hasViewPermission && matchesSearch;
    }),
  })).filter((g) => g.items.length > 0);
});
</script>

<template>
  <nav class="flex-1 overflow-y-auto py-6 px-3 scrollbar-hide space-y-7">
    <div v-for="group in filteredGroups" :key="group.title" class="space-y-1.5">
      <!-- Group Title -->
      <h3 v-if="group.title" class="px-3 text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-[0.15em] mb-2.5 transition-all duration-300 overflow-hidden whitespace-nowrap" :class="!isExpanded ? 'opacity-0 h-0 my-0' : 'opacity-100 h-auto my-0'">
        {{ group.title }}
      </h3>

      <!-- Group Items -->
      <div class="space-y-0.5">
        <NuxtLink v-for="item in group.items" :key="item.path" :to="item.path" class="nav-link group flex items-center rounded-lg transition-all duration-200 relative overflow-hidden h-10" :class="[!isExpanded ? 'justify-center w-9 mx-auto px-3' : 'gap-3 px-3']">
          <Icon :name="item.icon" class="w-4.5 h-4.5 shrink-0 transition-colors duration-200" :class="['text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-zinc-200 group-[.router-link-active]:text-[var(--sidebar-text-active)]']" />
          <span class="text-[14px] font-medium whitespace-nowrap transition-all duration-300 flex-1" :class="!isExpanded ? 'opacity-0 invisible w-0 -translate-x-2' : 'opacity-100 visible translate-x-0 ml-1'">
            {{ item.label }}
          </span>
        </NuxtLink>
      </div>
    </div>

    <!-- No Results -->
    <div v-if="filteredGroups.length === 0" class="px-3 text-xs text-zinc-400 italic">No matching menus found</div>
  </nav>
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
