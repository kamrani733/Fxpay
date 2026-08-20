import { Suspense } from 'react';
import { TransactionsDashboard } from './transactions-dashboard';

export default function Page() {
  return (
    <Suspense fallback={<main className="shell"><div className="panel loading">Loading filters...</div></main>}>
      <TransactionsDashboard />
    </Suspense>
  );
}
