<!-- components/layout/AppHeader.vue -->
<script setup lang="ts">
const authStore = useAuthStore();
const { isDark, toggleDark } = useTheme();
const router = useRouter();

const logout = () => {
  authStore.clearAuth();
  router.push("/login");
};
</script>

<template>
  <header class="h-14 border-b border-[var(--surface-border)] bg-[var(--surface-card)] flex items-center justify-between px-6 shrink-0">
    <div class="font-semibold text-lg"><!-- Optional Breadcrumb Area --></div>
    <div class="flex items-center gap-3">
      <!-- Dark mode toggle -->
      <Button text rounded @click="toggleDark">
        <Icon :name="isDark ? 'mdi:weather-sunny' : 'mdi:weather-night'" class="text-xl" />
      </Button>

      <!-- User info -->
      <span class="text-sm text-[var(--text-secondary)]">
        {{ authStore.fullName }}
      </span>

      <!-- Logout -->
      <Button text rounded severity="danger" @click="logout">
        <Icon name="mdi:logout" class="text-xl" />
      </Button>
    </div>
  </header>
</template>
