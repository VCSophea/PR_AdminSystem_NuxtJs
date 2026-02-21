<!-- layouts/default.vue -->
<template>
  <div class="flex h-screen overflow-hidden bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300">
    <!-- Sidebar -->
    <AppSidebar />

    <div class="flex flex-col flex-1 min-w-0 h-full overflow-hidden">
      <!-- Header -->
      <AppHeader />

      <!-- Main Content -->
      <main class="flex-1 overflow-y-auto bg-zinc-50 dark:bg-zinc-950 p-2">
        <div class="mx-auto max-w-8xl">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>
