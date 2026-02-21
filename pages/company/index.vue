<script setup lang="ts">
import { useCompany } from "~/features/company/company.composable";
import type { CompanyFormInput } from "~/features/company/company.schema";
import type { Company } from "~/features/company/company.types";
import CompanyAddEditDrawer from "~/features/company/components/CompanyAddEditDrawer.vue";

definePageMeta({
  middleware: ["permission"],
  requiredModule: "Company",
});

const { companies, totalCount, isLoading, page, rowsPerPage, searchText, fetchAll, create, remove } = useCompany();

const { hasPermission } = usePermission();

// * UI State
const showDrawer = ref(false);
const selectedCompany = ref<Company | null>(null);
const localSearch = ref("");

// * Selection State
const selectedRows = ref<Company[]>([]);

// * Action Menu State
const actionMenu = ref();
const activeCompany = ref<Company | null>(null);

const actionItems = computed(() => [
  {
    label: "View Details",
    icon: "mdi:eye-outline",
    command: () => {},
  },
  {
    label: "Edit",
    icon: "mdi:pencil-outline",
    visible: hasPermission("Company", "EDIT"),
    command: () => activeCompany.value && handleEdit(activeCompany.value),
  },
  {
    label: "Delete",
    icon: "mdi:delete-outline",
    visible: hasPermission("Company", "DELETE"),
    class: "text-red-500",
    command: () => activeCompany.value && remove(activeCompany.value.id),
  },
]);

const toggleActionMenu = (event: Event, company: Company) => {
  activeCompany.value = company;
  actionMenu.value.toggle(event);
};

// * Search Logic
const onSearch = () => {
  searchText.value = localSearch.value;
  page.value = 0;
};

const handleAdd = () => {
  selectedCompany.value = null;
  showDrawer.value = true;
};

const handleEdit = (company: Company) => {
  selectedCompany.value = company;
  showDrawer.value = true;
};

const handleSave = async (data: CompanyFormInput) => {
  try {
    await create(data);
    showDrawer.value = false;
  } catch (error) {
    console.error("Save failed:", error);
  }
};

onMounted(() => fetchAll());
</script>

<template>
  <div class="flex flex-col h-[calc(100vh-70px)] relative">
    <!-- Header Area -->
    <div class="flex items-center justify-between mb-2 px-1">
      <div class="flex flex-col gap-1">
        <h1 class="text-2xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">Company</h1>
      </div>

      <div class="flex items-center gap-3">
        <div class="relative w-72">
          <Icon name="mdi:magnify" class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <input v-model="localSearch" @keyup.enter="onSearch" type="text" placeholder="Search companies..." class="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg py-2 pl-9 pr-3 text-sm focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)] transition-all" />
        </div>
        <button v-if="hasPermission('Company', 'ADD')" @click="handleAdd" class="h-10 px-4 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-sm font-bold rounded-lg hover:opacity-90 active:scale-[0.98] transition-all flex items-center gap-2">
          <Icon name="mdi:plus" class="w-4 h-4" />
          Add Company
        </button>
      </div>
    </div>

    <!-- Table Container (Scrollable) -->
    <div class="flex-1 overflow-auto bg-white dark:bg-zinc-950 rounded-md border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col">
      <div class="flex-1 overflow-y-auto p">
        <DataTable v-model:selection="selectedRows" :value="companies" :loading="isLoading" responsiveLayout="scroll" stripedRows>
          <Column selectionMode="multiple" headerStyle="width: 3rem" class="px-4" />

          <Column header="Header" class="px-4">
            <template #body="{ data }">
              <div class="flex items-center gap-3 py-1">
                <div class="w-8 h-8 rounded bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center border border-zinc-200 dark:border-zinc-700 shrink-0">
                  <img v-if="data.logo" :src="data.logo" class="w-full h-full object-cover rounded" />
                  <Icon v-else name="mdi:office-building" class="text-zinc-400 w-5 h-5" />
                </div>
                <span class="font-bold text-zinc-900 dark:text-zinc-100 text-[13px]">{{ data.name }}</span>
              </div>
            </template>
          </Column>

          <Column field="description" header="Description" class="px-4">
            <template #body="{ data }">
              <span class="text-[13px] text-zinc-500 truncate max-w-[250px] block font-medium">{{ data.description || "—" }}</span>
            </template>
          </Column>

          <Column header="Status" class="px-4">
            <template #body="{ data }">
              <div class="flex items-center gap-1.5">
                <div :class="['w-2 h-2 rounded-full', data.isActive ? 'bg-emerald-500' : 'bg-zinc-300 dark:bg-zinc-600']"></div>
                <span :class="['text-[11px] font-bold uppercase tracking-wider', data.isActive ? 'text-emerald-600' : 'text-zinc-500']">
                  {{ data.isActive ? "Active" : "Inactive" }}
                </span>
              </div>
            </template>
          </Column>

          <Column header="Action" class="w-12 px-4">
            <template #body="{ data }">
              <button @click="toggleActionMenu($event, data)" class="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 transition-colors">
                <Icon name="mdi:dots-vertical" class="w-5 h-5" />
              </button>
            </template>
          </Column>

          <template #empty>
            <div class="py-20 flex flex-col items-center justify-center text-zinc-400 gap-3">
              <Icon name="mdi:inbox-outline" class="w-12 h-12 opacity-30" />
              <p class="text-sm font-medium">No records found</p>
            </div>
          </template>
        </DataTable>
      </div>

      <!-- Sticky Pagination Bar -->
      <AppDataTablePagination v-model:page="page" v-model:rowsPerPage="rowsPerPage" :total="totalCount" :totalSelected="selectedRows.length" />
    </div>

    <!-- Action Poper Menu -->
    <Menu ref="actionMenu" :model="actionItems" :popup="true" class="!text-xs !p-1.5 !rounded-xl !border-zinc-200 dark:!border-zinc-800 shadow-xl bg-white dark:bg-zinc-900">
      <template #item="{ item, props }">
        <a v-ripple class="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors cursor-pointer group" :class="item.class || 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800'">
          <Icon :name="item.icon || ''" class="w-4 h-4" />
          <span class="font-semibold">{{ item.label }}</span>
        </a>
      </template>
    </Menu>

    <!-- Add/Edit Drawer -->
    <CompanyAddEditDrawer v-model:visible="showDrawer" :company="selectedCompany" @saved="handleSave" />
  </div>
</template>
