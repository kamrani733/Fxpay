import { ArrowDownLeft, ArrowUpRight, WalletCards } from 'lucide-react';
import { formatCurrency, type TransactionSummary } from '@transactions/shared';

export function SummaryCard({ summary }: { summary: TransactionSummary }) {
  const balanceClass = summary.balance >= 0 ? 'positive' : 'negative';

  return (
    <section className="summary-grid" aria-label="Transaction summary">
      <article>
        <ArrowUpRight size={20} aria-hidden />
        <span>Total income</span>
        <strong className="positive">{formatCurrency(summary.totalIncome)}</strong>
      </article>
      <article>
        <ArrowDownLeft size={20} aria-hidden />
        <span>Total expense</span>
        <strong className="negative">{formatCurrency(summary.totalExpense)}</strong>
      </article>
      <article>
        <WalletCards size={20} aria-hidden />
        <span>Balance</span>
        <strong className={balanceClass}>{formatCurrency(summary.balance)}</strong>
      </article>
    </section>
  );
}
