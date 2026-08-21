import { ArrowDownLeft, ArrowUpRight, WalletCards } from 'lucide-react';
import { formatCurrency, type TransactionSummary } from '@transactions/shared';

export function SummaryCard({ summary }: { summary: TransactionSummary }) {
  const balanceClass = summary.balance >= 0 ? 'text-[#2ee68e]' : 'text-[#ff5f73]';

  return (
    <section className="my-7 grid grid-cols-3 gap-3 max-[820px]:grid-cols-1" aria-label="Transaction summary">
      <article className="grid min-w-0 gap-3 rounded-lg border border-[#243445] bg-[#111821]/95 p-[18px] shadow-[0_20px_50px_rgba(0,0,0,0.22)]">
        <ArrowUpRight size={20} aria-hidden />
        <span className="text-[#9cadbd]">Total income</span>
        <strong className="text-[28px] text-[#2ee68e] [overflow-wrap:anywhere]">{formatCurrency(summary.totalIncome)}</strong>
      </article>
      <article className="grid min-w-0 gap-3 rounded-lg border border-[#243445] bg-[#111821]/95 p-[18px] shadow-[0_20px_50px_rgba(0,0,0,0.22)]">
        <ArrowDownLeft size={20} aria-hidden />
        <span className="text-[#9cadbd]">Total expense</span>
        <strong className="text-[28px] text-[#ff5f73] [overflow-wrap:anywhere]">{formatCurrency(summary.totalExpense)}</strong>
      </article>
      <article className="grid min-w-0 gap-3 rounded-lg border border-[#243445] bg-[#111821]/95 p-[18px] shadow-[0_20px_50px_rgba(0,0,0,0.22)]">
        <WalletCards size={20} aria-hidden />
        <span className="text-[#9cadbd]">Balance</span>
        <strong className={`text-[28px] [overflow-wrap:anywhere] ${balanceClass}`}>{formatCurrency(summary.balance)}</strong>
      </article>
    </section>
  );
}
