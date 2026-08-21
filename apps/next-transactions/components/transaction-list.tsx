import { formatCurrency, formatDate, type Transaction } from '@transactions/shared';

export function TransactionList({ transactions }: { transactions: Transaction[] }) {
  return (
    <div className="max-sm:grid max-sm:gap-2.5 max-sm:p-2.5">
      <div className="grid grid-cols-[minmax(220px,1.5fr)_140px_150px_130px] items-center gap-4 px-4 py-3 text-xs uppercase text-[#9cadbd] max-sm:hidden">
        <span>Description</span>
        <span>Category</span>
        <span>Date</span>
        <span>Amount</span>
      </div>
      {transactions.map((transaction) => (
        <TransactionListItem key={transaction.id} transaction={transaction} />
      ))}
    </div>
  );
}

function TransactionListItem({ transaction }: { transaction: Transaction }) {
  const signedAmount = `${transaction.type === 'income' ? '+' : '-'}${formatCurrency(transaction.amount)}`;

  return (
    <article className="grid min-h-[76px] grid-cols-[minmax(220px,1.5fr)_140px_150px_130px] items-center gap-4 border-t border-[#243445] px-4 py-3.5 max-sm:grid-cols-1 max-sm:gap-2.5 max-sm:rounded-lg max-sm:border max-sm:bg-[#0b1118]">
      <div className="grid min-w-0 gap-2">
        <strong className="min-w-0 [overflow-wrap:anywhere]">{transaction.description}</strong>
        <span
          className={`w-fit rounded-full px-2 py-1 text-xs capitalize ${
            transaction.type === 'income'
              ? 'bg-[#2ee68e]/10 text-[#2ee68e]'
              : 'bg-[#ff5f73]/10 text-[#ff5f73]'
          }`}
        >
          {transaction.type}
        </span>
      </div>
      <span className="min-w-0 [overflow-wrap:anywhere]">{transaction.category}</span>
      <time className="min-w-0 [overflow-wrap:anywhere]" dateTime={transaction.date}>
        {formatDate(transaction.date)}
      </time>
      <strong
        className={`min-w-0 [overflow-wrap:anywhere] max-sm:text-[22px] ${
          transaction.type === 'income' ? 'text-[#2ee68e]' : 'text-[#ff5f73]'
        }`}
      >
        {signedAmount}
      </strong>
    </article>
  );
}
