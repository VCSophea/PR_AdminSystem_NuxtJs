<!-- pages/index.vue -->
<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
});

const authStore = useAuthStore();
</script>

<template>
  <div>
    <PageHeader title="Dashboard" />
    <div class="card bg-[var(--surface-card)] p-6 rounded-xl border border-[var(--surface-border)]">
      <h2 class="text-xl font-bold mb-4">Welcome back, {{ authStore.fullName }}!</h2>
      <p class="text-[var(--text-secondary)]">This is your dashboard. Please use the sidebar to navigate to your permitted modules.</p>
    </div>
  </div>
</template>
