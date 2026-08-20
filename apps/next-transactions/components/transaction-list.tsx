import { formatCurrency, formatDate, type Transaction } from '@transactions/shared';

export function TransactionList({ transactions }: { transactions: Transaction[] }) {
  return (
    <div className="transaction-list">
      <div className="table-head">
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
    <article className="transaction-row">
      <div>
        <strong>{transaction.description}</strong>
        <span className={`type-badge ${transaction.type}`}>{transaction.type}</span>
      </div>
      <span>{transaction.category}</span>
      <time dateTime={transaction.date}>{formatDate(transaction.date)}</time>
      <strong className={transaction.type === 'income' ? 'positive' : 'negative'}>{signedAmount}</strong>
    </article>
  );
}
