<script setup lang="ts">
import { formatCurrency, formatDate, type Transaction } from '@transactions/shared';
import { Button } from './ui/button';

defineProps<{
  transaction: Transaction | null;
}>();

defineEmits<{
  close: [];
}>();
</script>

<template>
  <Teleport to="body">
    <div
      v-if="transaction"
      class="fixed inset-0 z-50 grid place-items-center bg-[#172033]/55 p-4"
      role="presentation"
      @click.self="$emit('close')"
    >
      <section
        class="w-full max-w-[520px] border-[3px] border-[#172033] bg-white p-5 shadow-[10px_10px_0_#172033]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="transaction-details-title"
      >
        <header class="mb-5 flex items-start justify-between gap-4 border-b-2 border-[#172033] pb-4">
          <div class="min-w-0">
            <span class="mb-1.5 block text-xs uppercase text-gray-500">Transaction details</span>
            <h2 id="transaction-details-title" class="m-0 break-words text-2xl">
              {{ transaction.description }}
            </h2>
          </div>
          <Button type="button" variant="outline" class="min-h-9 px-2.5" aria-label="Close details" @click="$emit('close')">
            X
          </Button>
        </header>

        <dl class="grid gap-3">
          <div class="grid grid-cols-[120px_minmax(0,1fr)] gap-3 border-b border-[#d9e1ec] pb-3">
            <dt class="text-gray-500">Amount</dt>
            <dd
              class="m-0 break-words font-bold"
              :class="transaction.type === 'income' ? 'text-[#07855f]' : 'text-[#d13f5d]'"
            >
              {{ transaction.type === 'income' ? '+' : '-' }}{{ formatCurrency(transaction.amount) }}
            </dd>
          </div>
          <div class="grid grid-cols-[120px_minmax(0,1fr)] gap-3 border-b border-[#d9e1ec] pb-3">
            <dt class="text-gray-500">Type</dt>
            <dd class="m-0 capitalize">{{ transaction.type }}</dd>
          </div>
          <div class="grid grid-cols-[120px_minmax(0,1fr)] gap-3 border-b border-[#d9e1ec] pb-3">
            <dt class="text-gray-500">Category</dt>
            <dd class="m-0 break-words">{{ transaction.category }}</dd>
          </div>
          <div class="grid grid-cols-[120px_minmax(0,1fr)] gap-3 border-b border-[#d9e1ec] pb-3">
            <dt class="text-gray-500">Date</dt>
            <dd class="m-0">
              <time :datetime="transaction.date">{{ formatDate(transaction.date) }}</time>
            </dd>
          </div>
          <div class="grid grid-cols-[120px_minmax(0,1fr)] gap-3">
            <dt class="text-gray-500">ID</dt>
            <dd class="m-0 break-words">{{ transaction.id }}</dd>
          </div>
        </dl>
      </section>
    </div>
  </Teleport>
</template>
