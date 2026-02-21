<script setup lang="ts">
import ServiceTypeAddEditDrawer from "~/features/service-type/components/ServiceTypeAddEditDrawer.vue";
import { useServiceType } from "~/features/service-type/service-type.composable";
import type { ServiceTypeFormInput } from "~/features/service-type/service-type.schema";
import type { ServiceType } from "~/features/service-type/service-type.types";

// * Navigation Meta
definePageMeta({ middleware: ["permission"], requiredModule: "Service Type" });

// * State & Logic
const { list, total, page, rowsPerPage, searchText, fetch, create, update, remove, toggle, isLoading } = useServiceType();
const { hasPermission } = usePermission();

const showDrawer = ref(false);
const selectedItem = ref<ServiceType | null>(null);
const localSearch = ref("");

const actionMenu = ref();
const activeItem = ref<ServiceType | null>(null);

const actionItems = computed(() => [
  { label: "Edit", icon: "mdi:pencil-outline", visible: hasPermission("Service Type", "EDIT"), command: () => activeItem.value && handleEdit(activeItem.value) },
  { label: "Delete", icon: "mdi:delete-outline", visible: hasPermission("Service Type", "DELETE"), class: "text-red-500", command: () => activeItem.value && remove(activeItem.value.id) },
]);

// * Handlers
const onSearch = () => {
  searchText.value = localSearch.value;
  page.value = 0;
};
const handleAdd = () => {
  selectedItem.value = null;
  showDrawer.value = true;
};
const handleEdit = (item: ServiceType) => {
  selectedItem.value = item;
  showDrawer.value = true;
};
const handleSave = async (v: ServiceTypeFormInput) => {
  selectedItem.value ? await update(selectedItem.value.id, v) : await create(v);
  showDrawer.value = false;
};

onMounted(() => fetch());
</script>

<template>
  <div class="flex flex-col h-[calc(100vh-120px)] relative">
    <!-- Header -->
    <div class="flex items-center justify-between mb-8 px-1">
      <div>
        <h1 class="text-2xl font-bold tracking-tight">Service Type</h1>
        <p class="text-sm text-zinc-500 font-medium">Define and manage business service categories.</p>
      </div>

      <div class="flex items-center gap-3">
        <div class="relative w-64">
          <Icon name="mdi:magnify" class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <input v-model="localSearch" @keyup.enter="onSearch" type="text" placeholder="Search..." class="w-full bg-white dark:bg-zinc-900 border rounded-lg py-2 pl-9 pr-3 text-sm focus:ring-1 focus:ring-[var(--color-primary)] transition-all" />
        </div>
        <button v-if="hasPermission('Service Type', 'ADD')" @click="handleAdd" class="h-10 px-4 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-sm font-bold rounded-lg hover:opacity-90 active:scale-95 transition-all flex items-center gap-2"><Icon name="mdi:plus" class="w-4 h-4" /> Add</button>
      </div>
    </div>

    <!-- Content -->
    <div class="flex-1 overflow-hidden bg-white dark:bg-zinc-950 rounded-xl border shadow-sm flex flex-col">
      <div class="flex-1 overflow-y-auto">
        <DataTable :value="list" :loading="isLoading" class="p-datatable-sm" stripedRows>
          <Column field="name" header="Name" class="font-bold text-[13px] px-4" />
          <Column field="nameOther" header="Name (Other)" class="text-[13px] text-zinc-500 px-4" />
          <Column header="Status" class="px-4">
            <template #body="{ data }">
              <div class="flex items-center gap-2">
                <div :class="['w-2 h-2 rounded-full', data.isActive ? 'bg-emerald-500' : 'bg-zinc-300']"></div>
                <span class="text-[11px] font-bold uppercase tracking-wider" :class="data.isActive ? 'text-emerald-600' : 'text-zinc-400'">{{ data.isActive ? "Active" : "Inactive" }}</span>
              </div>
            </template>
          </Column>
          <Column header="Action" class="w-12 px-4">
            <template #body="{ data }">
              <button
                @click="
                  (e) => {
                    activeItem = data;
                    actionMenu.toggle(e);
                  }
                "
                class="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-zinc-100 text-zinc-500 transition-colors"
              >
                <Icon name="mdi:dots-vertical" class="w-5 h-5" />
              </button>
            </template>
          </Column>
        </DataTable>
      </div>
      <AppDataTablePagination v-model:page="page" v-model:rowsPerPage="rowsPerPage" :total="total" />
    </div>

    <Menu ref="actionMenu" :model="actionItems" :popup="true" class="!text-xs !p-1.5 !rounded-xl" />
    <ServiceTypeAddEditDrawer v-model:visible="showDrawer" :item="selectedItem" @saved="handleSave" />
  </div>
</template>
