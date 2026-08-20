<script setup lang="ts">
import { formatCurrency, type TransactionSummary } from '@transactions/shared';

defineProps<{
  summary: TransactionSummary;
}>();
</script>

<template>
  <section
    class="my-6 grid grid-cols-3 border-[3px] border-[#172033] bg-white max-[820px]:grid-cols-1"
    aria-label="Transaction summary"
  >
    <article class="grid min-w-0 gap-2 border-r-2 border-[#172033] p-4 max-[820px]:border-b-2 max-[820px]:border-r-0">
      <span class="text-xs uppercase text-gray-500">Income</span>
      <strong class="text-2xl text-[#07855f] [overflow-wrap:anywhere]">{{ formatCurrency(summary.totalIncome) }}</strong>
    </article>
    <article class="grid min-w-0 gap-2 border-r-2 border-[#172033] p-4 max-[820px]:border-b-2 max-[820px]:border-r-0">
      <span class="text-xs uppercase text-gray-500">Expense</span>
      <strong class="text-2xl text-[#d13f5d] [overflow-wrap:anywhere]">{{ formatCurrency(summary.totalExpense) }}</strong>
    </article>
    <article class="grid min-w-0 gap-2 bg-[#dff1ff] p-4">
      <span class="text-xs uppercase text-gray-500">Balance</span>
      <strong
        class="text-2xl [overflow-wrap:anywhere]"
        :class="summary.balance >= 0 ? 'text-[#07855f]' : 'text-[#d13f5d]'"
      >
        {{ formatCurrency(summary.balance) }}
      </strong>
    </article>
  </section>
</template>
