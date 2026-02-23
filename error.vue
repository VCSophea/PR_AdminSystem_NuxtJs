<template>
  <div class="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 p-6">
    <div class="max-w-md w-full text-center space-y-6">
      <div class="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 mb-2">
        <Icon name="mdi:alert-circle-outline" class="w-10 h-10" />
      </div>

      <h1 class="text-6xl font-black tracking-tight text-zinc-900 dark:text-zinc-100">
        {{ error?.statusCode ?? "500" }}
      </h1>

      <div class="space-y-2">
        <h2 class="text-xl font-bold text-zinc-800 dark:text-zinc-200">
          {{ error?.statusMessage ?? "An unexpected error occurred." }}
        </h2>
        <p class="text-sm text-zinc-500 dark:text-zinc-400">
          {{ error?.message ?? "We're sorry, but something went wrong. Please try returning to the dashboard." }}
        </p>
      </div>

      <button @click="handleError" class="mt-8 h-12 px-8 rounded-xl bg-[var(--brand-primary)] text-white text-[14px] font-bold shadow-lg shadow-[var(--brand-primary)]/20 hover:opacity-90 transition-all">Back to Dashboard</button>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  error: Object,
});

const handleError = () => clearError({ redirect: "/" });
</script>
