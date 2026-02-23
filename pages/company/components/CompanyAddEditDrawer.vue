<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { companySchema } from "~/utils/shared/schemas";
import type { Company } from "~/utils/types";

const activeTab = ref("overview");
const props = defineProps<{ visible: boolean; company?: Company | null }>();
const emit = defineEmits(["update:visible", "saved"]);
const isEdit = computed(() => !!props.company);

const { handleSubmit, resetForm, isSubmitting, setFieldValue, values: formValues } = useForm({ validationSchema: toTypedSchema(companySchema), initialValues: { isActive: true } });
watch(
  () => props.visible,
  (val) => val && resetForm({ values: props.company ? { ...props.company, logo: undefined } : { name: "", description: "", contactPerson: "", email: "", phone: "", isActive: true, logo: undefined } }),
);

const onSubmit = handleSubmit(async (v: any) => emit("saved", v));
const close = () => emit("update:visible", false);
</script>

<template>
  <Drawer :visible="visible" @update:visible="emit('update:visible', $event)" position="right" class="!w-full md:!w-80 lg:!w-[30rem] glass-drawer" header=" ">
    <template #header>
      <div class="flex flex-col gap-1 pr-4">
        <h2 class="text-xl font-bold tracking-tight">{{ isEdit ? "Edit Company" : "Add New Company" }}</h2>
      </div>
    </template>

    <div class="flex flex-col h-full -mt-4">
      <!-- Tabs -->
      <div class="flex items-center gap-6 border-b border-zinc-100 dark:border-zinc-800 shrink-0">
        <button v-for="tab in ['Overview', 'Settings']" :key="tab" @click="activeTab = tab" class="pb-3 text-xs font-bold uppercase tracking-widest transition-all relative" :class="activeTab === tab ? 'text-[var(--color-primary)]' : 'text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200'">
          {{ tab }}
          <div v-if="activeTab === tab" class="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--color-primary)] rounded-full"></div>
        </button>
      </div>

      <div class="flex-1 overflow-y-auto pr-1 pt-4">
        <form @submit="onSubmit" id="company-form">
          <!-- Overview Tab -->
          <div v-show="activeTab === 'overview'" class="space-y-4">
            <AppFormField name="name" label="Company Name" required placeholder="Enter company name" icon="mdi:office-building" iconPosition="left" />
            <AppFormField name="description" label="Description" type="textarea" :rows="4" placeholder="Briefly describe the company mission or focus..." />
            <div class="grid grid-cols-2 gap-4">
              <AppFormField name="contactPerson" label="Contact Person" placeholder="John Doe" icon="mdi:account" iconPosition="left" />
              <AppFormField name="phone" label="Phone" placeholder="+855 12 345 678" icon="mdi:phone" iconPosition="left" />
            </div>
            <AppFormField name="email" label="Email Address" type="email" placeholder="contact@company.com" icon="mdi:email-outline" iconPosition="left" />
          </div>

          <!-- Settings Tab -->
          <div v-show="activeTab === 'settings'" class="space-y-4">
            <div class="p-4 rounded-xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 flex items-center justify-between">
              <div class="flex flex-col gap-0.5">
                <span class="text-sm font-bold text-zinc-900 dark:text-zinc-100">Visibility Status</span>
                <span class="text-[11px] text-zinc-500 font-medium">If inactive, this company will be hidden from lists.</span>
              </div>
              <ToggleSwitch :modelValue="formValues.isActive" @update:modelValue="setFieldValue('isActive', $event)" />
            </div>
            <div class="p-4 rounded-xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50">
              <span class="block text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-1">Advanced Settings</span>
              <p class="text-[11px] text-zinc-500 font-medium mb-4">Additional organization parameters can be configured here.</p>
              <button type="button" class="w-full py-2 px-4 rounded-lg border border-zinc-200 dark:border-zinc-700 text-[11px] font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">Manage Metadata</button>
            </div>
          </div>
        </form>
      </div>

      <!-- Footer -->
      <div class="mt-8 pt-6 border-t border-zinc-100 dark:border-zinc-800 flex items-center gap-3">
        <button type="button" @click="close" class="flex-1 h-11 px-6 rounded-xl border border-zinc-200 dark:border-zinc-800 text-[13px] font-bold text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all">Cancel</button>
        <button type="submit" form="company-form" :disabled="isSubmitting" class="flex-[1.5] h-11 px-6 rounded-xl bg-[var(--color-primary)] text-white text-[13px] font-bold shadow-lg shadow-[var(--color-primary)]/20 hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2">
          <Icon v-if="isSubmitting" name="mdi:loading" class="w-4 h-4 animate-spin" />
          {{ isEdit ? "Update Changes" : "Create Company" }}
        </button>
      </div>
    </div>
  </Drawer>
</template>

<style scoped>
.glass-drawer {
  background: var(--glass-bg) !important;
  backdrop-filter: blur(var(--glass-blur)) !important;
  -webkit-backdrop-filter: blur(var(--glass-blur)) !important;
  border-left: 1px solid var(--glass-border) !important;
  box-shadow: var(--glass-card-shadow) !important;
}

:deep(.p-drawer-content) {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  background: transparent !important;
}

:deep(.p-drawer-header) {
  padding: 1.5rem;
  border-bottom: 1px solid var(--glass-border);
  background: transparent !important;
}

/* * Shorter logic styling */
.glass-drawer form {
  @apply flex flex-col h-full;
}

/* Backdrop blur effect on the mask overlay */
:deep(.p-drawer-mask) {
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  background-color: rgba(0, 0, 0, 0.4) !important;
}
</style>
