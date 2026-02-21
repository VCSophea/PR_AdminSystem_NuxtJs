<!-- pages/company/index.vue -->
<script setup lang="ts">
import { useCompany } from "~/features/company/composables/useCompany";

definePageMeta({
  middleware: ["auth", "permission"],
  requiredModule: "Company",
});

const { companies, isLoading, search, fetchAll, remove, toggleStatus } = useCompany();
const { hasPermission } = usePermission();

const showModal = ref(false);

onMounted(() => fetchAll());
watch(search, () => fetchAll());
</script>

<template>
  <div>
    <PageHeader title="Company">
      <template #action>
        <Button v-if="hasPermission('Company')" label="Add New" icon="pi pi-plus" @click="showModal = true" />
      </template>
    </PageHeader>

    <div class="card bg-[var(--surface-card)] rounded-xl shadow-sm p-4 border border-[var(--surface-border)]">
      <!-- Search -->
      <div class="mb-4">
        <InputText v-model="search" placeholder="Search by company name..." class="w-72" />
      </div>

      <!-- Table -->
      <DataTable :value="companies" :loading="isLoading" paginator :rows="10" stripedRows>
        <Column field="logo" header="Logo">
          <template #body="{ data }">
            <img :src="data.logo" class="w-10 h-10 rounded-full object-contain" />
          </template>
        </Column>
        <Column field="companyName" header="Company Name" sortable />
        <Column field="contactPerson" header="Contact Person" sortable />
        <Column field="email" header="Email" sortable />
        <Column field="phone" header="Phone Number" />
        <Column field="status" header="Status">
          <template #body="{ data }">
            <ToggleSwitch v-model="data.status" @change="toggleStatus(data.id, data.status)" />
          </template>
        </Column>
        <Column field="createdBy" header="Created By" />
        <Column field="modifiedBy" header="Modified By" />
        <Column header="Action">
          <template #body="{ data }">
            <div class="flex items-center gap-2">
              <Button icon="pi pi-eye" text rounded severity="info" />
              <Button icon="pi pi-pencil" text rounded severity="warn" />
              <Button icon="pi pi-trash" text rounded severity="danger" @click="remove(data.id)" />
            </div>
          </template>
        </Column>
      </DataTable>
    </div>

    <!-- Modal placeholder -->
    <Dialog v-model:visible="showModal" header="Add Company" :modal="true" :style="{ width: '50vw' }">
      <p>Company form goes here.</p>
    </Dialog>
  </div>
</template>
