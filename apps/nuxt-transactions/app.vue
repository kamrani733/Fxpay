<script setup lang="ts">
import { ref } from 'vue';
import type { Transaction } from '@transactions/shared';

const {
  filters,
  filteredTransactions,
  summary,
  loading,
  error,
  submitting,
  submitError,
  setFilters,
  createTransaction,
  retry,
} = useTransactions();

const selectedTransaction = ref<Transaction | null>(null);
</script>

<template>
  <main class="mx-auto w-[calc(100%_-_32px)] max-w-[1120px] px-0 py-7 max-sm:w-[calc(100%_-_20px)] max-sm:pt-5">
    <header class="flex items-start justify-between gap-4 border-b-[3px] border-[#172033] pb-5 max-sm:flex-col">
      <div>
        <p class="mb-1.5 text-xs uppercase text-gray-500">Nuxt cashbook</p>
        <h1 class="m-0 max-w-[720px] text-[clamp(38px,8vw,82px)] leading-[0.92] tracking-normal">
          Money Movements
        </h1>
      </div>
      <span class="rotate-[1.5deg] border-2 border-[#172033] bg-[#f6c453] px-3 py-2 max-sm:w-fit">
        Local-first mock data
      </span>
    </header>

    <SummaryStrip :summary="summary" />

    <section class="grid grid-cols-[minmax(0,1fr)_330px] items-start gap-5 max-[820px]:grid-cols-1">
      <div class="border-[3px] border-[#172033] bg-white">
        <TransactionFilters :filters="filters" @change="setFilters" />

        <LoadingState v-if="loading" />
        <ErrorState v-else-if="error" :message="error" @retry="retry" />
        <EmptyState v-else-if="filteredTransactions.length === 0" />
        <TransactionList v-else :transactions="filteredTransactions" @select="selectedTransaction = $event" />
      </div>

      <TransactionForm :submitting="submitting" :submit-error="submitError" :on-submit="createTransaction" />
    </section>

    <TransactionDetailsModal
      :transaction="selectedTransaction"
      @close="selectedTransaction = null"
    />
  </main>
</template>
