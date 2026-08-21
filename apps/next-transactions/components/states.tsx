import { RefreshCw } from 'lucide-react';
import { Button } from './ui/button';

export function LoadingState() {
  return (
    <div className="grid gap-px" aria-label="Loading transactions">
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          className="h-[76px] animate-pulse bg-gradient-to-r from-[#101820] via-[#1d2b38] to-[#101820]"
          key={index}
        />
      ))}
    </div>
  );
}

export function ErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="m-4 grid justify-items-start gap-3 rounded-lg border border-dashed border-[#243445] p-6 text-[#9cadbd]">
      <strong className="text-[#edf4fb]">{message}</strong>
      <Button type="button" onClick={onRetry}>
        <RefreshCw size={16} aria-hidden />
        Retry
      </Button>
    </div>
  );
}

export function EmptyState() {
  return (
    <div className="m-4 grid justify-items-start gap-3 rounded-lg border border-dashed border-[#243445] p-6 text-[#9cadbd]">
      <strong className="text-[#edf4fb]">No transactions found</strong>
      <p className="m-0">Try another search term or type filter.</p>
    </div>
  );
}
