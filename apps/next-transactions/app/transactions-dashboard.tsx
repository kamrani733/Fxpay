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
    <main className="shell">
      <section className="masthead">
        <div>
          <p className="eyebrow">Next.js ledger</p>
          <h1>Transaction Console</h1>
        </div>
        <span className="api-pill">API :4000</span>
      </section>

      <SummaryCard summary={summary} />

      <section className="workspace">
        <div className="panel list-panel">
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
