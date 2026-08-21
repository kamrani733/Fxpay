import { Suspense } from 'react';
import { TransactionsDashboard } from './transactions-dashboard';

export default function Page() {
  return (
    <Suspense
      fallback={
        <main className="mx-auto w-[calc(100%_-_32px)] max-w-[1180px] py-8">
          <div className="rounded-lg border border-[#243445] bg-[#111821]/95 p-5 shadow-[0_20px_50px_rgba(0,0,0,0.22)]">
            Loading filters...
          </div>
        </main>
      }
    >
      <TransactionsDashboard />
    </Suspense>
  );
}
