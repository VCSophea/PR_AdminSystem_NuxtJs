<script setup lang="ts">
import { useCustomerType } from "~/features/customer-type/customer-type.composable";
import { type CustomerTypeFormInput } from "~/utils/shared/schemas";
import type { CustomerType } from "~/utils/types";
import CustomerTypeAddEditDrawer from "./components/CustomerTypeAddEditDrawer.vue";

// * Navigation Meta
definePageMeta({ middleware: ["permission"], requiredModule: "customer-type" });

// * State & Logic
const { items, total, isLoading, page, rowsPerPage, search, refresh, create, update, remove } = useCustomerType();
const { hasPermission, allowView, allowAdd, allowEdit, allowDelete, allowApprove, allowDisapprove, allowPick } = usePermission();

// * UI State
const showDrawer = ref(false),
  selectedItem = ref<CustomerType | null>(null),
  localSearch = ref(""),
  selectedRows = ref<CustomerType[]>([]);
const actionMenu = ref(),
  activeItem = ref<CustomerType | null>(null);

const actionItems = computed(() => [
  { label: "Edit", icon: "mdi:pencil-outline", visible: allowEdit("customer-type"), command: () => activeItem.value && handleEdit(activeItem.value) },
  { label: "Delete", icon: "mdi:delete-outline", visible: allowDelete("customer-type"), class: "text-red-500", command: () => activeItem.value && remove(activeItem.value.id) },
]);

const toggleActionMenu = (e: Event, i: CustomerType) => {
  activeItem.value = i;
  actionMenu.value.toggle(e);
};

// * Logic
const onSearch = () => {
  search.value = localSearch.value;
  page.value = 0;
};
const handleAdd = () => {
  selectedItem.value = null;
  showDrawer.value = true;
};
const handleEdit = (i: CustomerType) => {
  selectedItem.value = i;
  showDrawer.value = true;
};
const handleSave = async (v: CustomerTypeFormInput) => {
  selectedItem.value ? await update(selectedItem.value.id, v) : await create(v);
  showDrawer.value = false;
};

onMounted(() => refresh());
</script>

<template>
  <div class="flex flex-col h-[calc(100vh-120px)] relative">
    <!-- Header -->
    <div class="flex items-center justify-between mb-8 px-1">
      <div>
        <h1 class="text-2xl font-bold tracking-tight">Customer Type</h1>
        <p class="text-sm text-zinc-500 font-medium">Manage and segment your customer categories.</p>
      </div>

      <div class="flex items-center gap-3">
        <div class="relative w-64">
          <Icon name="mdi:magnify" class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <input v-model="localSearch" @keyup.enter="onSearch" type="text" placeholder="Search..." class="w-full bg-white dark:bg-zinc-900 border rounded-lg py-2 pl-9 pr-3 text-sm focus:ring-1 focus:ring-[var(--color-primary)] transition-all" />
        </div>
        <button v-if="allowAdd('customer-type')" @click="handleAdd" class="h-10 px-4 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-sm font-bold rounded-lg hover:opacity-90 active:scale-95 transition-all flex items-center gap-2"><Icon name="mdi:plus" class="w-4 h-4" /> Add</button>
      </div>
    </div>

    <!-- Content -->
    <div class="flex-1 overflow-hidden bg-white dark:bg-zinc-950 rounded-xl border shadow-sm flex flex-col">
      <div class="flex-1 overflow-y-auto">
        <DataTable :value="items" :loading="isLoading" class="p-datatable-sm" stripedRows>
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
    <CustomerTypeAddEditDrawer v-model:visible="showDrawer" :item="selectedItem" @saved="handleSave" />
  </div>
</template>
