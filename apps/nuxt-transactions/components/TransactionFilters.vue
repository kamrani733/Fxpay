<script setup lang="ts">
import type { TransactionType } from '@transactions/shared';
import { Button } from './ui/button';
import { Input } from './ui/input';

type TypeFilter = TransactionType | 'all';

defineProps<{
  filters: { q: string; type: TypeFilter };
}>();

const emit = defineEmits<{
  change: [patch: Partial<{ q: string; type: TypeFilter }>];
}>();
</script>

<template>
  <div class="flex justify-between gap-3.5 border-b-[3px] border-[#172033] p-3.5 max-sm:flex-col">
    <label class="grid min-w-0 flex-1 gap-1.5 text-xs uppercase text-gray-500">
      <span>Search</span>
      <Input
        :value="filters.q"
        placeholder="coffee, salary, ticket..."
        aria-label="Search descriptions"
        @input="emit('change', { q: ($event.target as HTMLInputElement).value })"
      />
    </label>

    <div
      class="grid grid-cols-3 self-end border-2 border-[#172033] max-sm:w-full"
      aria-label="Transaction type filter"
    >
      <Button
        v-for="option in (['all', 'income', 'expense'] as TypeFilter[])"
        :key="option"
        type="button"
        class="min-h-10 min-w-[70px] border-0 border-r-2 border-[#172033] bg-white px-2 capitalize text-[#172033] last:border-r-0"
        :class="{ '!bg-[#172033] !text-white': filters.type === option }"
        @click="emit('change', { type: option })"
      >
        {{ option }}
      </Button>
    </div>
  </div>
</template>
