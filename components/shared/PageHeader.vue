<!-- components/shared/PageHeader.vue -->
<script setup lang="ts">
defineProps<{ title: string }>();
</script>

<template>
  <div class="flex items-center justify-between mb-6">
    <h1 class="text-2xl font-bold text-[var(--text-primary)]">{{ title }}</h1>
    <slot name="action" />
  </div>
</template>
