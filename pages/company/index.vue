<script setup lang="ts">
import { useCompany } from "~/features/company/company.composable";
import type { Company } from "~/types";
import { type CompanyFormInput } from "~/utils/shared/schemas";
import CompanyAddEditDrawer from "./components/CompanyAddEditDrawer.vue";

definePageMeta({ middleware: ["permission"], requiredModule: "Company" });

const { companies, totalCount, page, rowsPerPage, searchText, refresh, create, remove, isLoading } = useCompany();
const { hasPermission } = usePermission();

const showDrawer = ref(false);
const selectedCompany = ref<Company | null>(null);
const selectedRows = ref<Company[]>([]);
const localSearch = ref("");
const actionMenu = ref();
const activeCompany = ref<Company | null>(null);

const actionItems = computed(() => [
  { label: "Edit", icon: "mdi:pencil-outline", visible: hasPermission("Company", "EDIT"), command: () => activeCompany.value && handleEdit(activeCompany.value) },
  { label: "Delete", icon: "mdi:delete-outline", visible: hasPermission("Company", "DELETE"), class: "text-red-500", command: () => activeCompany.value && remove(activeCompany.value.id) },
]);

const toggleActionMenu = (e: Event, c: Company) => {
  activeCompany.value = c;
  actionMenu.value.toggle(e);
};

// * Logic Handlers
const onSearch = () => {
  searchText.value = localSearch.value;
  page.value = 0;
};
const handleAdd = () => {
  selectedCompany.value = null;
  showDrawer.value = true;
};
const handleEdit = (c: Company) => {
  selectedCompany.value = c;
  showDrawer.value = true;
};
const handleSave = async (v: CompanyFormInput) => {
  await create(v);
  showDrawer.value = false;
};

onMounted(() => refresh());
</script>

<template>
  <div class="flex flex-col h-[calc(100vh-70px)]">
    <!-- * Page Header -->
    <div class="flex items-center justify-between mb-4 px-1">
      <h1 class="text-2xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">Company</h1>
      <div class="flex items-center gap-3">
        <div class="relative w-72">
          <Icon name="mdi:magnify" class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <input v-model="localSearch" @keyup.enter="onSearch" type="text" placeholder="Search companies..." class="w-full h-9 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg pl-9 pr-3 text-sm focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)] transition-all" />
        </div>
        <button v-if="hasPermission('Company', 'ADD')" @click="handleAdd" class="h-9 px-4 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-sm font-semibold rounded-lg hover:opacity-90 active:scale-[0.98] transition-all flex items-center gap-2 whitespace-nowrap">
          <Icon name="mdi:plus" class="w-4 h-4" />
          Add Company
        </button>
      </div>
    </div>

    <!-- * Table Block -->
    <div class="flex-1 flex flex-col overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm">
      <div class="flex-1 overflow-auto">
        <DataTable v-model:selection="selectedRows" :value="companies" :loading="isLoading" responsiveLayout="scroll" class="app-table">
          <!-- Checkbox column -->
          <Column selectionMode="multiple" headerStyle="width:3rem; text-align:center" bodyStyle="text-align:center" />

          <!-- Name -->
          <Column header="Name">
            <template #body="{ data }">
              <div class="flex items-center gap-3 py-0.5">
                <div class="w-7 h-7 rounded-md bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center shrink-0 overflow-hidden">
                  <img v-if="data.logo" :src="data.logo" class="w-full h-full object-cover" />
                  <Icon v-else name="mdi:office-building-outline" class="w-4 h-4 text-zinc-400" />
                </div>
                <span class="font-semibold text-sm text-zinc-900 dark:text-zinc-100">{{ data.name }}</span>
              </div>
            </template>
          </Column>

          <!-- Description -->
          <Column field="description" header="Description">
            <template #body="{ data }">
              <span class="text-sm text-zinc-500 dark:text-zinc-400">{{ data.description || "—" }}</span>
            </template>
          </Column>

          <!-- Status -->
          <Column header="Status" headerStyle="width:9rem">
            <template #body="{ data }">
              <span :class="['inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full', data.isActive ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400' : 'bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400']">
                <span :class="['w-1.5 h-1.5 rounded-full', data.isActive ? 'bg-emerald-500' : 'bg-zinc-400']"></span>
                {{ data.isActive ? "Active" : "Inactive" }}
              </span>
            </template>
          </Column>

          <!-- Action -->
          <Column header="" headerStyle="width:4rem">
            <template #body="{ data }">
              <button @click="toggleActionMenu($event, data)" class="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 dark:hover:text-zinc-200 transition-colors">
                <Icon name="mdi:dots-vertical" class="w-4 h-4" />
              </button>
            </template>
          </Column>

          <!-- Empty State -->
          <template #empty>
            <div class="py-20 flex flex-col items-center gap-3 text-zinc-400">
              <Icon name="mdi:inbox-outline" class="w-12 h-12 opacity-30" />
              <p class="text-sm font-medium">No records found</p>
            </div>
          </template>
        </DataTable>
      </div>

      <!-- * Pagination -->
      <AppDataTablePagination v-model:page="page" v-model:rowsPerPage="rowsPerPage" :total="totalCount" :totalSelected="selectedRows.length" />
    </div>

    <!-- * Context Menu -->
    <Menu ref="actionMenu" :model="actionItems" :popup="true" class="!text-xs !p-1.5 !rounded-xl shadow-xl">
      <template #item="{ item }">
        <a v-ripple class="flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer transition-colors" :class="item.class || 'text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800'">
          <Icon :name="item.icon || ''" class="w-4 h-4" />
          <span class="font-medium">{{ item.label }}</span>
        </a>
      </template>
    </Menu>

    <!-- * Drawer -->
    <CompanyAddEditDrawer v-model:visible="showDrawer" :company="selectedCompany" @saved="handleSave" />
  </div>
</template>

<style>
/* * DataTable header dark row */
.app-table .p-datatable-thead > tr > th {
  background: #111827 !important;
  color: #e5e7eb !important;
  font-size: 0.75rem !important;
  font-weight: 600 !important;
  letter-spacing: 0.05em !important;
  text-transform: uppercase !important;
  padding: 0.75rem 1rem !important;
  border-color: #1f2937 !important;
  white-space: nowrap;
}

.app-table .p-datatable-tbody > tr > td {
  padding: 0.625rem 1rem !important;
  border-color: #f4f4f5 !important;
  font-size: 0.875rem;
}

.dark .app-table .p-datatable-tbody > tr > td {
  border-color: #27272a !important;
}

.app-table .p-datatable-tbody > tr:hover > td {
  background: #f9fafb !important;
}

.dark .app-table .p-datatable-tbody > tr:hover > td {
  background: #18181b !important;
}
</style>
