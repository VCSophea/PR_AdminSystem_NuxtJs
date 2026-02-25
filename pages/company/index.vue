<script setup lang="ts">
import { useCompany } from "~/features/company/company.composable";
import { MENU_CONSTANT } from "~/utils/menu";
import { type CompanyFormInput } from "~/utils/shared/schemas";
import type { Company } from "~/utils/types";
import CompanyAddEditDrawer from "./components/CompanyAddEditDrawer.vue";

const REQUIRED_MODULE = MENU_CONSTANT[1]?.items?.[0]?.moduleName || "";
definePageMeta({ middleware: ["permission"], requiredModule: REQUIRED_MODULE });

const { companies, totalCount, page, rowsPerPage, searchText, refresh, create, remove, toggleStatus, isLoading } = useCompany();
const { allowAdd, allowEdit, allowDelete, allowView } = usePermission();

const showDrawer = ref(false);
const selectedCompany = ref<Company | null>(null);
const selectedRows = ref<Company[]>([]);
const localSearch = ref("");

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
const handleStatusChange = async (c: Company) => {
  try {
    await toggleStatus(c.id, Boolean(c.isActive));
  } catch (error) {
    console.error("Failed to toggle status", error);
  }
};
const handleSave = async (v: CompanyFormInput) => {
  await create(v);
  showDrawer.value = false;
};

onMounted(() => refresh());
</script>

<template>
  <div class="p-2 flex flex-col h-[calc(100vh-70px)] gap-3 bg-zinc-50 dark:bg-zinc-950">
    <!-- * Filters & Actions -->
    <div class="flex items-start justify-between shadow-sm pb-2">
      <div class="flex items-center gap-2 max-w-sm">
        <AppFormField v-model="localSearch" label="Company Name" placeholder="Search..." class="flex-1" @keyup.enter="onSearch" />
        <Button icon="pi pi-search" @click="onSearch" class="!h-10 !w-10 shrink-0" />
      </div>
      <Button v-if="allowAdd(REQUIRED_MODULE)" label="Add New" icon="pi pi-plus" size="small" @click="handleAdd" class="!px-5 !h-10" />
    </div>

    <!-- * Data Table Area -->
    <div class="flex-1 overflow-hidden flex flex-col">
      <DataTable :value="companies" :loading="isLoading" stripedRows scrollable scrollHeight="flex" class="p-datatable-sm">
        <Column header="No" headerStyle="width: 3.5rem" class="text-center">
          <template #body="slotProps">
            <span class="text-xs font-mono text-zinc-500">{{ slotProps.index + 1 + page * rowsPerPage }}</span>
          </template>
        </Column>

        <Column header="Logo" headerStyle="width: 4rem" class="text-center">
          <template #body="{ data }">
            <div class="w-9 h-9 rounded-full border border-zinc-200 dark:border-zinc-800 flex items-center justify-center overflow-hidden bg-white dark:bg-zinc-950 mx-auto">
              <img v-if="data.logo" :src="data.logo" class="w-full h-full object-cover" />
              <Icon v-else name="mdi:office-building" class="w-4.5 h-4.5 text-zinc-300" />
            </div>
          </template>
        </Column>

        <Column header="Company Name" field="name" sortable class="font-bold text-zinc-800 dark:text-zinc-200">
          <template #body="{ data }">
            <span class="text-[13px]">{{ data.name }}</span>
          </template>
        </Column>

        <Column header="Contact Person" field="contactPerson" sortable>
          <template #body="{ data }">
            <span class="text-[12px]">{{ data.contactPerson }}</span>
          </template>
        </Column>

        <Column header="Email" field="email" sortable>
          <template #body="{ data }">
            <span class="text-[12px] text-zinc-600 dark:text-zinc-400 font-medium">{{ data.email }}</span>
          </template>
        </Column>

        <Column header="Phone Number" field="phone" sortable>
          <template #body="{ data }">
            <span class="text-[12px] font-mono">{{ data.phone }}</span>
          </template>
        </Column>

        <Column header="Status" field="isActive" class="text-center">
          <template #body="{ data }">
            <ToggleSwitch v-model="data.isActive" @change="handleStatusChange(data)" size="small" />
          </template>
        </Column>

        <Column header="Audit Info" headerStyle="width: 14rem">
          <template #body="{ data }">
            <div class="flex flex-col text-[10px] text-zinc-500 leading-tight">
              <span class="font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-tighter">{{ data.createdBy }}</span>
              <span class="italic font-medium">{{ data.created }}</span>
            </div>
          </template>
        </Column>

        <Column header="Action" headerStyle="width: 8rem" class="text-center">
          <template #body="{ data }">
            <div class="flex items-center justify-center gap-1">
              <Button
                v-if="allowView(REQUIRED_MODULE)"
                icon="pi pi-eye"
                text
                rounded
                severity="secondary"
                @click="
                  selectedCompany = data;
                  showDrawer = true;
                "
              />
              <Button v-if="allowEdit(REQUIRED_MODULE)" icon="pi pi-pencil" text rounded severity="info" @click="handleEdit(data)" />
              <Button v-if="allowDelete(REQUIRED_MODULE)" icon="pi pi-trash" text rounded severity="danger" @click="remove(data.id)" />
            </div>
          </template>
        </Column>

        <template #empty>
          <div class="py-20 flex flex-col items-center gap-2 text-zinc-400">
            <Icon name="mdi:inbox-outline" class="w-12 h-12 opacity-10" />
            <p class="text-xs font-bold uppercase tracking-widest italic">No Records Found</p>
          </div>
        </template>
      </DataTable>

      <AppDataTablePagination v-model:page="page" v-model:rowsPerPage="rowsPerPage" :total="totalCount" :totalSelected="selectedRows.length" />
    </div>

    <!-- * Drawer -->
    <CompanyAddEditDrawer v-model:visible="showDrawer" :company="selectedCompany" @saved="handleSave" />
  </div>
</template>

<style scoped>
:deep(.p-datatable-thead > tr > th) {
  @apply text-[10px] uppercase tracking-widest font-bold text-zinc-400 bg-zinc-50/50 dark:bg-zinc-800/30 py-3 border-b border-zinc-100 dark:border-zinc-800;
}
</style>
