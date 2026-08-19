import type { Transaction, TransactionSummary } from './types';

export function computeSummary(transactions: Transaction[]): TransactionSummary {
  return transactions.reduce<TransactionSummary>(
    (summary, transaction) => {
      if (transaction.type === 'income') {
        summary.totalIncome += transaction.amount;
      } else {
        summary.totalExpense += transaction.amount;
      }

      summary.balance = summary.totalIncome - summary.totalExpense;
      return summary;
    },
    { totalIncome: 0, totalExpense: 0, balance: 0 },
  );
}

export function formatCurrency(amount: number, locale = 'en-US', currency = 'USD'): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(date: string, locale = 'en-US'): string {
  return new Intl.DateTimeFormat(locale, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(date));
}
