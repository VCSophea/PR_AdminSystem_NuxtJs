<!-- components/shared/ConfirmDialog.vue -->
<script setup lang="ts">
const props = defineProps<{
  visible: boolean;
  message?: string;
}>();

const emit = defineEmits<{
  "update:visible": [value: boolean];
  confirm: [];
}>();
</script>

<template>
  <Dialog :visible="props.visible" @update:visible="emit('update:visible', $event)" header="Confirm Delete" :style="{ width: '400px' }" modal>
    <p class="text-[var(--text-secondary)]">
      {{ props.message ?? "Are you sure you want to delete this record?" }}
    </p>
    <template #footer>
      <Button label="Cancel" text @click="emit('update:visible', false)" />
      <Button label="Delete" severity="danger" @click="emit('confirm')" />
    </template>
  </Dialog>
</template>
