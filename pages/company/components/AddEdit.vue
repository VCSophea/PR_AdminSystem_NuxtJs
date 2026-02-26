<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { useUpload } from "~/composables/useUpload";
import { companySchema } from "~/utils/shared/schemas";
import type { Company } from "~/utils/types";

const props = defineProps<{ visible: boolean; company?: Company | null }>();
const emit = defineEmits(["update:visible", "saved"]);
const isEdit = computed(() => !!props.company);

// * Logic & State
const { uploadFile, isUploading } = useUpload();
const { handleSubmit, resetForm, isSubmitting, setFieldValue, values: formValues, errors } = useForm({ validationSchema: toTypedSchema(companySchema), initialValues: { isActive: true } });
const logoPreview = ref<string | null>(null);

// * Life Cycle
watch(
  () => props.visible,
  (v) => {
    if (v) {
      resetForm({ values: props.company ? { ...props.company } : { name: "", contactPerson: "", email: "", phone: "", isActive: true, logo: undefined } });
      logoPreview.value = props.company?.logo || null;
    }
  },
);

// * Handlers
const onFileSelect = async (e: any) => {
  const path = await uploadFile(e.files[0]);
  if (path) {
    setFieldValue("logo", path);
    logoPreview.value = path;
  }
};
const removeLogo = () => (setFieldValue("logo", undefined), (logoPreview.value = null));
const onSubmit = handleSubmit(async (v) => emit("saved", v));
</script>

<template>
  <Drawer :visible="visible" @update:visible="emit('update:visible', $event)" position="right" class="!w-full md:!w-80 lg:!w-[28rem]" :header="isEdit ? 'Edit Company' : 'Add New Company'">
    <div class="flex flex-col h-full mt-2">
      <div class="flex-1 overflow-y-auto pr-1">
        <form @submit="onSubmit" id="company-form" class="space-y-5">
          <!-- Logo field -->
          <div class="flex flex-col gap-1 relative">
            <label class="text-sm font-medium text-zinc-500">Logo <span class="text-red-500">*</span></label>
            <div class="border border-dashed border-zinc-200 dark:border-zinc-700 rounded-xl p-4 flex flex-col items-center justify-center text-center bg-zinc-50/50 dark:bg-zinc-800/50">
              <div v-if="!logoPreview" class="flex flex-col items-center gap-3 w-full">
                <Icon name="mdi:cloud-upload-outline" class="w-8 h-8 text-zinc-400" />
                <span class="text-sm text-zinc-500">Drag drop, or click to select Image</span>
                <FileUpload mode="basic" accept="image/*" :maxFileSize="5000000" customUpload auto @uploader="onFileSelect" chooseLabel="Browse Image" class="!text-xs" />
              </div>
              <div v-else class="flex flex-col items-center gap-3 w-full">
                <Image :src="getImageUrl(logoPreview)" alt="Logo Preview" imageClass="max-h-24 object-contain rounded" preview />
                <Button label="Remove Image" icon="pi pi-trash" severity="danger" text size="small" @click="removeLogo" />
              </div>
            </div>
            <small v-if="isUploading" class="text-[0.72rem] font-medium text-[var(--color-primary)] mt-0.5 flex items-center gap-1"><Icon name="mdi:loading" class="animate-spin w-3 h-3" /> Uploading...</small>
            <small v-else-if="errors.logo" class="text-[0.72rem] font-medium text-red-500 mt-0.5">{{ errors.logo }}</small>
          </div>

          <AppFormField name="name" label="Company Name" required />
          <AppFormField name="contactPerson" label="Contact Person" required />
          <AppFormField name="email" label="Email" required type="email" />
          <AppFormField name="phone" label="Phone" required />

          <!-- Status -->
          <div class="flex items-center gap-4 mt-2">
            <label class="text-sm font-medium text-zinc-500">Status</label>
            <div class="flex items-center gap-2">
              <ToggleSwitch :modelValue="formValues.isActive" @update:modelValue="setFieldValue('isActive', $event)">
                <template #handle="{ checked }">
                  <i :class="['!text-xs pi', { 'pi-check': checked, 'pi-times': !checked }]" />
                </template>
              </ToggleSwitch>
              <span class="text-sm text-zinc-500">{{ formValues.isActive ? "Active" : "Inactive" }}</span>
            </div>
          </div>
        </form>
      </div>

      <!-- Footer -->
      <div class="mt-6 pt-4 pb-2 border-t border-zinc-100 dark:border-zinc-800">
        <Button type="submit" form="company-form" :loading="isSubmitting" :disabled="isUploading" :label="isEdit ? 'Update' : 'Save'" class="!px-8" />
      </div>
    </div>
  </Drawer>
</template>
