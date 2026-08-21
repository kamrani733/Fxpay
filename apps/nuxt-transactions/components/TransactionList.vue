<script setup lang="ts">
import { formatCurrency, formatDate, type Transaction } from '@transactions/shared';

defineProps<{
  transactions: Transaction[];
}>();

defineEmits<{
  select: [transaction: Transaction];
}>();
</script>

<template>
  <div class="grid">
    <div
      class="grid grid-cols-[126px_minmax(0,1fr)_92px_124px] items-center gap-3.5 border-b-2 border-[#172033] bg-[#f8fbff] p-3.5 text-xs uppercase text-gray-500 max-sm:hidden"
    >
      <span>Date</span>
      <span>Description</span>
      <span>Type</span>
      <span>Amount</span>
    </div>
    <TransactionListItem
      v-for="transaction in transactions"
      :key="transaction.id"
      :transaction="transaction"
      :amount="`${transaction.type === 'income' ? '+' : '-'}${formatCurrency(transaction.amount)}`"
      :date-label="formatDate(transaction.date)"
      @select="$emit('select', transaction)"
    />
  </div>
</template>
