<script setup lang="ts">
import { Button } from './ui/button';

defineProps<{
  message: string;
}>();

defineEmits<{
  retry: [];
}>();
</script>

<template>
  <div class="m-3.5 grid justify-items-start gap-3 border-2 border-dashed border-[#172033] bg-[#fbfdff] p-5">
    <strong>{{ message }}</strong>
    <Button
      type="button"
      @click="$emit('retry')"
    >
      Retry
    </Button>
  </div>
</template>
