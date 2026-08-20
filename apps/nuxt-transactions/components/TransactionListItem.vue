<script setup lang="ts">
import type { Transaction } from '@transactions/shared';

defineProps<{
  transaction: Transaction;
  amount: string;
  dateLabel: string;
}>();

defineEmits<{
  select: [];
}>();
</script>

<template>
  <article
    class="grid min-h-[72px] cursor-pointer grid-cols-[126px_minmax(0,1fr)_92px_124px] items-center gap-3.5 border-b-2 border-[#d9e1ec] p-3.5 outline-none transition-colors last:border-b-0 hover:bg-[#f7fbff] focus:bg-[#f7fbff] max-sm:m-2.5 max-sm:grid-cols-1 max-sm:gap-2 max-sm:border-2 max-sm:border-[#172033] max-sm:bg-[#fbfdff]"
    role="button"
    tabindex="0"
    @click="$emit('select')"
    @keydown.enter="$emit('select')"
    @keydown.space.prevent="$emit('select')"
  >
    <time class="min-w-0 break-words text-gray-500" :datetime="transaction.date">{{ dateLabel }}</time>
    <div class="grid min-w-0 gap-1.5">
      <strong class="min-w-0 break-words">{{ transaction.description }}</strong>
      <span class="min-w-0 break-words text-gray-500">{{ transaction.category }}</span>
    </div>
    <mark
      class="w-fit border-2 border-current bg-transparent px-2 py-1 text-[11px] uppercase"
      :class="transaction.type === 'income' ? 'text-[#07855f]' : 'text-[#d13f5d]'"
    >
      {{ transaction.type }}
    </mark>
    <b
      class="min-w-0 break-words"
      :class="transaction.type === 'income' ? 'text-[#07855f]' : 'text-[#d13f5d]'"
    >
      {{ amount }}
    </b>
  </article>
</template>
