'use client';

import { Plus, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTransactions } from '../lib/use-transactions';
import { EmptyState, ErrorState, LoadingState } from '../components/states';
import { Filters } from '../components/filters';
import { SummaryCard } from '../components/summary-card';
import { TransactionForm } from '../components/transaction-form';
import { TransactionList } from '../components/transaction-list';
import { Button } from '../components/ui/button';

export function TransactionsDashboard() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
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

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 24);
    }

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="mx-auto w-[calc(100%_-_32px)] max-w-[1180px] pb-8 max-sm:w-[calc(100%_-_20px)] max-sm:pb-5">
      <header
        className={`sticky top-0 z-40 -mx-4 mb-7 flex items-end justify-between gap-4 border-b border-[#243445] bg-[#080b0f]/92 px-4 backdrop-blur transition-all duration-300 max-[820px]:flex-col max-[820px]:items-start ${
          isScrolled ? 'py-3 shadow-[0_14px_30px_rgba(0,0,0,0.28)]' : 'py-8 max-sm:py-5'
        }`}
      >
        <div>
          <p className={`font-bold uppercase text-[#7cb7ff] transition-all ${isScrolled ? 'mb-1 text-[11px]' : 'mb-2 text-xs'}`}>
            Next.js ledger
          </p>
          <h1
            className={`m-0 leading-[0.9] tracking-normal transition-all duration-300 ${
              isScrolled ? 'text-[30px] max-sm:text-2xl' : 'text-[clamp(36px,7vw,72px)] max-sm:text-[44px]'
            }`}
          >
            Transaction Console
          </h1>
        </div>
        <div className="flex flex-wrap items-center gap-3 max-sm:w-full">
          <span className="whitespace-nowrap rounded-full border border-[#243445] px-3 py-2 text-[#9cadbd]">
            Track every move
          </span>
          <Button type="button" className="max-sm:flex-1" onClick={() => setIsFormOpen(true)}>
            <Plus size={18} aria-hidden />
            Add
          </Button>
        </div>
      </header>

      <SummaryCard summary={summary} />

      <section>
        <div className="overflow-hidden rounded-lg border border-[#243445] bg-[#111821]/95 shadow-[0_20px_50px_rgba(0,0,0,0.22)]">
          <Filters filters={filters} onChange={setFilters} />
          {loading ? <LoadingState /> : null}
          {error && !loading ? <ErrorState message={error} onRetry={retry} /> : null}
          {!loading && !error && filteredTransactions.length === 0 ? <EmptyState /> : null}
          {!loading && !error && filteredTransactions.length > 0 ? (
            <TransactionList transactions={filteredTransactions} />
          ) : null}
        </div>
      </section>

      {isFormOpen ? (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4"
          role="presentation"
          onClick={() => setIsFormOpen(false)}
        >
          <section
            className="w-full max-w-[420px]"
            role="dialog"
            aria-modal="true"
            aria-labelledby="next-add-transaction-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-3 flex justify-end">
              <Button type="button" variant="outline" className="min-h-10 px-3" onClick={() => setIsFormOpen(false)}>
                <X size={18} aria-hidden />
                Close
              </Button>
            </div>
            <TransactionForm
              onSubmit={createTransaction}
              onSuccess={() => setIsFormOpen(false)}
              submitting={submitting}
              submitError={submitError}
            />
          </section>
        </div>
      ) : null}
    </main>
  );
}
