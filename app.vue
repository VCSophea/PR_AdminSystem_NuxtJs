<template>
  <div>
    <!-- Global UI Progress Bar -->
    <NuxtLoadingIndicator color="var(--brand-primary)" :height="3" />

    <!-- Main Nuxt Application Tree -->
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <!-- Global Toast Notifications -->
    <Toaster position="top-right" rich-colors closeButton />
  </div>
</template>

<script setup lang="ts">
import { Toaster } from "vue-sonner";

// Optional: Global app lifecycle initialization
</script>
