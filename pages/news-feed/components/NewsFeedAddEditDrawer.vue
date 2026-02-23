<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import type { NewsFeed } from "~/types";
import { newsFeedSchema } from "~/utils/shared/schemas";

const props = defineProps<{ visible: boolean; item?: NewsFeed | null }>();
const emit = defineEmits(["update:visible", "saved"]);

// * Setup Form
const { handleSubmit, resetForm, isSubmitting, setFieldValue, values } = useForm({
  validationSchema: toTypedSchema(newsFeedSchema),
  initialValues: { isActive: true },
});

// * Sync Logic
watch(
  () => props.visible,
  (v) => {
    if (v) resetForm({ values: props.item ? { ...props.item } : { title: "", content: "", author: "", isActive: true } });
  },
);

const onSubmit = handleSubmit(async (v: any) => emit("saved", v));
const close = () => emit("update:visible", false);
</script>

<template>
  <Drawer :visible="visible" @update:visible="close" position="right" class="!w-full md:!w-[500px] glass-drawer" header="News Feed">
    <form @submit="onSubmit" class="flex flex-col h-full space-y-6">
      <div class="flex-1 space-y-5">
        <AppFormField name="title" label="Title" required placeholder="Enter news title" icon="mdi:newspaper" iconPosition="left" />
        <AppFormField name="author" label="Author" placeholder="Publisher name" icon="mdi:account-edit" iconPosition="left" />
        <AppFormField name="content" label="Content" type="textarea" :rows="8" placeholder="Write your news article here..." />

        <div class="flex items-center justify-between p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800">
          <span class="text-sm font-bold">Active Status</span>
          <ToggleSwitch :modelValue="values.isActive" @update:modelValue="setFieldValue('isActive', $event)" />
        </div>
      </div>

      <div class="pt-6 border-t flex gap-3">
        <button type="button" @click="close" class="flex-1 h-11 rounded-xl border font-bold text-zinc-500 hover:bg-zinc-50 transition-all">Cancel</button>
        <button type="submit" :disabled="isSubmitting" class="flex-[1.5] h-11 rounded-xl bg-[var(--color-primary)] text-white font-bold shadow-lg shadow-[var(--color-primary)]/20 hover:opacity-90 transition-all">
          {{ item ? "Update News" : "Publish News" }}
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
