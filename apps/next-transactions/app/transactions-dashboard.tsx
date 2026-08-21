'use client';

import { useTransactions } from '../lib/use-transactions';
import { EmptyState, ErrorState, LoadingState } from '../components/states';
import { Filters } from '../components/filters';
import { SummaryCard } from '../components/summary-card';
import { TransactionForm } from '../components/transaction-form';
import { TransactionList } from '../components/transaction-list';

export function TransactionsDashboard() {
  const {
    filteredTransactions,
    summary,
    filters,
    setFilters,
    createTransaction,
    loading,
    error,
    retry,
    submitting,
    submitError,
  } = useTransactions();

  return (
    <main className="mx-auto w-[calc(100%_-_32px)] max-w-[1180px] py-8 max-sm:w-[calc(100%_-_20px)] max-sm:py-5">
      <section className="flex min-h-[116px] items-end justify-between gap-4 max-[820px]:min-h-0 max-[820px]:flex-col max-[820px]:items-start">
        <div>
          <p className="mb-2 text-xs font-bold uppercase text-[#7cb7ff]">Next.js ledger</p>
          <h1 className="m-0 text-[clamp(36px,7vw,72px)] leading-[0.9] tracking-normal max-sm:text-[44px]">
            Transaction Console
          </h1>
        </div>
        <span className="whitespace-nowrap rounded-full border border-[#243445] px-3 py-2 text-[#9cadbd]">
          Local mock data
        </span>
      </section>

      <SummaryCard summary={summary} />

      <section className="grid grid-cols-[minmax(0,1fr)_340px] items-start gap-[18px] max-[820px]:grid-cols-1">
        <div className="overflow-hidden rounded-lg border border-[#243445] bg-[#111821]/95 shadow-[0_20px_50px_rgba(0,0,0,0.22)]">
          <Filters filters={filters} onChange={setFilters} />
          {loading ? <LoadingState /> : null}
          {error && !loading ? <ErrorState message={error} onRetry={retry} /> : null}
          {!loading && !error && filteredTransactions.length === 0 ? <EmptyState /> : null}
          {!loading && !error && filteredTransactions.length > 0 ? (
            <TransactionList transactions={filteredTransactions} />
          ) : null}
        </div>

        <TransactionForm onSubmit={createTransaction} submitting={submitting} submitError={submitError} />
      </section>
    </main>
  );
}
