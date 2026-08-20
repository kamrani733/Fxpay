import { RefreshCw } from 'lucide-react';

export function LoadingState() {
  return (
    <div className="skeleton-stack" aria-label="Loading transactions">
      {Array.from({ length: 5 }).map((_, index) => (
        <div className="skeleton-row" key={index} />
      ))}
    </div>
  );
}

export function ErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="state-box">
      <strong>{message}</strong>
      <button type="button" onClick={onRetry}>
        <RefreshCw size={16} aria-hidden />
        Retry
      </button>
    </div>
  );
}

export function EmptyState() {
  return (
    <div className="state-box">
      <strong>No transactions found</strong>
      <p>Try another search term or type filter.</p>
    </div>
  );
}
