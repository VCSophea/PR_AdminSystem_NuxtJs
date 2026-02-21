<script setup lang="ts">
interface Props {
  total: number;
  page: number; // 0-indexed
  rowsPerPage: number;
  totalSelected?: number;
}

const props = withDefaults(defineProps<Props>(), {
  totalSelected: 0,
});

const emit = defineEmits(["update:page", "update:rowsPerPage"]);

const totalPages = computed(() => Math.ceil(props.total / props.rowsPerPage));

const handlePageChange = (newPage: number) => {
  if (newPage >= 0 && newPage < totalPages.value) {
    emit("update:page", newPage);
  }
};

const handleRowsPerPageChange = (event: Event) => {
  const value = parseInt((event.target as HTMLSelectElement).value);
  emit("update:page", 0); // Reset to first page
  emit("update:rowsPerPage", value);
};
</script>

<template>
  <div class="flex items-center justify-between px-6 py-4 bg-white dark:bg-zinc-950 border-t border-zinc-100 dark:border-zinc-800">
    <!-- Selection Info -->
    <div class="text-[13px] text-zinc-500 dark:text-zinc-400 font-medium">{{ totalSelected }} of {{ total }} row(s) selected.</div>

    <div class="flex items-center gap-8">
      <!-- Rows per page -->
      <div class="flex items-center gap-3">
        <p class="text-[13px] font-medium text-zinc-900 dark:text-zinc-100">Rows per page</p>
        <div class="relative">
          <select :value="rowsPerPage" @change="handleRowsPerPageChange" class="appearance-none h-8 w-[70px] rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3 pr-8 text-[13px] font-medium text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)] transition-all cursor-pointer">
            <option :value="10">10</option>
            <option :value="20">20</option>
            <option :value="30">30</option>
            <option :value="50">50</option>
            <option :value="100">100</option>
          </select>
          <Icon name="mdi:chevron-down" class="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
        </div>
      </div>

      <!-- Page X of Y -->
      <div class="text-[13px] font-medium text-zinc-900 dark:text-zinc-100">Page {{ total > 0 ? page + 1 : 0 }} of {{ totalPages || 0 }}</div>

      <!-- Navigation -->
      <div class="flex items-center gap-2">
        <button @click="handlePageChange(0)" :disabled="page === 0" class="h-8 w-8 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex items-center justify-center text-zinc-900 dark:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm">
          <Icon name="mdi:chevron-double-left" class="w-4 h-4" />
        </button>
        <button @click="handlePageChange(page - 1)" :disabled="page === 0" class="h-8 w-8 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex items-center justify-center text-zinc-900 dark:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm">
          <Icon name="mdi:chevron-left" class="w-4 h-4" />
        </button>
        <button @click="handlePageChange(page + 1)" :disabled="page >= totalPages - 1 || total === 0" class="h-8 w-8 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex items-center justify-center text-zinc-900 dark:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm">
          <Icon name="mdi:chevron-right" class="w-4 h-4" />
        </button>
        <button @click="handlePageChange(totalPages - 1)" :disabled="page >= totalPages - 1 || total === 0" class="h-8 w-8 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex items-center justify-center text-zinc-900 dark:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm">
          <Icon name="mdi:chevron-double-right" class="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>
</template>
