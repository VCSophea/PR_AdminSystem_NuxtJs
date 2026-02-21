<!-- pages/403.vue -->
<script setup lang="ts">
definePageMeta({ layout: "auth" });
</script>

<template>
  <div class="text-center">
    <Icon name="mdi:lock" class="text-6xl text-[var(--brand-primary)] mb-4" />
    <h1 class="text-3xl font-bold text-[var(--text-primary)] mb-2">Access Denied</h1>
    <p class="text-[var(--text-secondary)] mb-6">You don't have permission to access this page.</p>
    <Button label="Back to Dashboard" @click="navigateTo('/')" />
  </div>
</template>
