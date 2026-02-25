<script setup lang="ts">
import Menu from "./Menu.vue";

const layoutStore = useLayoutStore();
const authStore = useAuthStore();
const { logout } = useAuth();
const { isDark } = useTheme();

// * Reactive Pulse
const searchQuery = ref("");
const isHovered = ref(false);
const showProfileMenu = ref(false);
const isExpanded = computed(() => !layoutStore.isSidebarCollapsed || isHovered.value);
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
    <div class="px-4 mt-6 shrink-0 overflow-hidden relative">
      <AppFormField v-model="searchQuery" icon="mdi:magnify" placeholder="Search menu..." glass :class="!isExpanded ? 'opacity-0 invisible pointer-events-none' : 'opacity-100 visible'" />
      <div v-if="!isExpanded" class="absolute inset-0 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900 flex items-center justify-center cursor-pointer transition-all duration-300 mx-4" @click="layoutStore.toggleSidebar">
        <Icon name="mdi:magnify" class="w-5 h-5 text-zinc-500" />
      </div>
    </div>

    <!-- Grouped Navigation -->
    <Menu :is-expanded="isExpanded" :search-query="searchQuery" />

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
