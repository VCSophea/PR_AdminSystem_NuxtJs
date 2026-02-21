<!-- layouts/auth.vue -->
<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat auth-bg">
    <!-- Top-right toggles -->
    <div class="absolute top-4 right-4 z-20">
      <AppHeaderActions />
    </div>

    <!-- Logo -->
    <img src="~/assets/images/logo.webp" alt="Logo" class="h-24 w-auto object-contain drop-shadow-lg z-10 mb-5" />

    <!-- Card slot -->
    <div class="z-10 w-full max-w-sm px-4">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.auth-bg {
  background-image: url("~/assets/images/login-bg.webp");
}
</style>
