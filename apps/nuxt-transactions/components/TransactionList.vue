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
