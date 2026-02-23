<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import type { ServiceType } from "~/types";
import { serviceTypeSchema } from "~/utils/shared/schemas";

const props = defineProps<{ visible: boolean; item?: ServiceType | null }>();
const emit = defineEmits(["update:visible", "saved"]);

// * Setup Form
const { handleSubmit, resetForm, isSubmitting, setFieldValue, values } = useForm({
  validationSchema: toTypedSchema(serviceTypeSchema),
  initialValues: { isActive: true },
});

// * Sync Logic
watch(
  () => props.visible,
  (v) => {
    if (v) resetForm({ values: props.item ? { ...props.item } : { name: "", nameOther: "", description: "", isActive: true } });
  },
);

const onSubmit = handleSubmit(async (v: any) => emit("saved", v));
const close = () => emit("update:visible", false);
</script>

<template>
  <Drawer :visible="visible" @update:visible="close" position="right" class="!w-full md:!w-[450px] glass-drawer" header="Service Type">
    <form @submit="onSubmit" class="flex flex-col h-full space-y-6">
      <div class="flex-1 space-y-5">
        <AppFormField name="name" label="Name" required placeholder="Service name" />
        <AppFormField name="nameOther" label="Name (Other)" placeholder="Alternative name" />
        <AppFormField name="description" label="Description" type="textarea" :rows="3" />

        <div class="flex items-center justify-between p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800">
          <span class="text-sm font-bold">Active Status</span>
          <ToggleSwitch :modelValue="values.isActive" @update:modelValue="setFieldValue('isActive', $event)" />
        </div>
      </div>

      <div class="pt-6 border-t flex gap-3">
        <button type="button" @click="close" class="flex-1 h-11 rounded-xl border font-bold text-zinc-500 hover:bg-zinc-50 transition-all">Cancel</button>
        <button type="submit" :disabled="isSubmitting" class="flex-[1.5] h-11 rounded-xl bg-[var(--color-primary)] text-white font-bold shadow-lg shadow-[var(--color-primary)]/20 hover:opacity-90 transition-all">
          {{ item ? "Update" : "Create" }}
        </button>
      </div>
    </form>
  </Drawer>
</template>

<style scoped>
.glass-drawer {
  background: var(--glass-bg) !important;
  backdrop-filter: blur(var(--glass-blur)) !important;
  -webkit-backdrop-filter: blur(var(--glass-blur)) !important;
  border-left: 1px solid var(--glass-border) !important;
}
:deep(.p-drawer-content) {
  background: transparent !important;
}
:deep(.p-drawer-header) {
  background: transparent !important;
  border-bottom: 1px solid var(--glass-border);
}
</style>
