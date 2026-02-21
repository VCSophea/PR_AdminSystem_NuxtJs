<!-- components/shared/AppHeaderActions.vue -->
<script setup lang="ts">
const { isDark, toggleDark } = useTheme();
const { locale, setLocale } = useI18n();

const toggleLanguage = () => setLocale(locale.value === "en" ? "km" : "en");
</script>

<template>
  <div class="flex items-center gap-2 p-4">
    <!-- Language Switcher -->
    <button @click="toggleLanguage" class="action-btn">
      <Icon name="mdi:translate" class="w-3.5 h-3.5 opacity-70" />
      <span>{{ locale === "en" ? "EN" : "KM" }}</span>
    </button>

    <!-- Theme Toggle -->
    <button @click="toggleDark" class="action-btn">
      <Icon :name="isDark ? 'mdi:weather-sunny' : 'mdi:weather-night'" class="w-3.5 h-3.5 transition-transform duration-500" :class="isDark ? 'rotate-0' : 'rotate-12'" />
      <span>{{ isDark ? "Dark" : "Light" }}</span>
    </button>
  </div>
</template>

<style scoped>
.action-btn {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.4rem 0.9rem;
  border-radius: 9999px;
  background: var(--glass-bg);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1.5px solid var(--glass-border);
  color: #ffffff;
  font-size: 0.72rem;
  font-weight: 700;
  cursor: pointer;
  transition:
    background 0.2s,
    border-color 0.2s;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.4);
}
.action-btn:hover {
  background: rgba(255, 255, 255, 0.42);
}
</style>
