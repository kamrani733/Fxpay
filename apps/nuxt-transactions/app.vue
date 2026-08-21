<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';
import type { Transaction } from '@transactions/shared';
import { Button } from './components/ui/button';

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
const isFormOpen = ref(false);
const isScrolled = ref(false);

function handleScroll() {
  isScrolled.value = window.scrollY > 24;
}

onMounted(() => {
  handleScroll();
  window.addEventListener('scroll', handleScroll, { passive: true });
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <main class="mx-auto w-[calc(100%_-_32px)] max-w-[1120px] px-0 pb-7 max-sm:w-[calc(100%_-_20px)] max-sm:pb-5">
    <header
      class="sticky top-0 z-40 -mx-4 mb-6 flex items-start justify-between gap-4 border-b-[3px] border-[#172033] bg-[#f5f7fb]/95 px-4 backdrop-blur transition-all duration-300 max-sm:flex-col"
      :class="isScrolled ? 'py-3 shadow-[0_12px_0_rgba(23,32,51,0.16)]' : 'py-7 max-sm:py-5'"
    >
      <div>
        <p
          class="uppercase text-gray-500 transition-all"
          :class="isScrolled ? 'mb-1 text-[11px]' : 'mb-1.5 text-xs'"
        >
          Nuxt cashbook
        </p>
        <h1
          class="m-0 max-w-[720px] leading-[0.92] tracking-normal transition-all duration-300"
          :class="isScrolled ? 'text-[30px] max-sm:text-2xl' : 'text-[clamp(38px,8vw,82px)]'"
        >
          Money Movements
        </h1>
      </div>
      <div class="flex flex-wrap items-center gap-3 max-sm:w-full">
        <span class="rotate-[1.5deg] border-2 border-[#172033] bg-[#f6c453] px-3 py-2 max-sm:w-fit">
          Small money, clear story
        </span>
        <Button type="button" class="max-sm:flex-1" @click="isFormOpen = true">
          <span aria-hidden="true">+</span>
          Add
        </Button>
      </div>
    </header>

    <SummaryStrip :summary="summary" />

    <section>
      <div class="border-[3px] border-[#172033] bg-white">
        <TransactionFilters :filters="filters" @change="setFilters" />

        <LoadingState v-if="loading" />
        <ErrorState v-else-if="error" :message="error" @retry="retry" />
        <EmptyState v-else-if="filteredTransactions.length === 0" />
        <TransactionList v-else :transactions="filteredTransactions" @select="selectedTransaction = $event" />
      </div>
    </section>

    <Teleport to="body">
      <div
        v-if="isFormOpen"
        class="fixed inset-0 z-50 grid place-items-center bg-[#172033]/60 p-4"
        role="presentation"
        @click.self="isFormOpen = false"
      >
        <section
          class="w-full max-w-[430px]"
          role="dialog"
          aria-modal="true"
          aria-labelledby="nuxt-add-transaction-title"
        >
          <div class="mb-3 flex justify-end">
            <Button type="button" variant="outline" class="min-h-10 px-3" @click="isFormOpen = false">
              Close
            </Button>
          </div>
          <TransactionForm
            :submitting="submitting"
            :submit-error="submitError"
            :on-submit="createTransaction"
            :on-success="() => { isFormOpen = false }"
          />
        </section>
      </div>
    </Teleport>

    <TransactionDetailsModal
      :transaction="selectedTransaction"
      @close="selectedTransaction = null"
    />
  </main>
</template>
