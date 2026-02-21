<!-- layouts/default.vue -->
<template>
  <div class="flex h-screen overflow-hidden">
    <AppSidebar />
    <div class="flex flex-col flex-1 overflow-hidden">
      <AppHeader />
      <main class="flex-1 overflow-y-auto p-6 bg-[var(--surface-bg)]">
        <slot />
      </main>
    </div>
  </div>
</template>
