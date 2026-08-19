import { describe, expect, it } from 'vitest';
import type { Transaction } from './types';
import { computeSummary, formatCurrency, formatDate } from './utils';
import { transactionFormSchema } from './validation';

describe('computeSummary', () => {
  it('totals income, expenses, and balance', () => {
    const transactions: Transaction[] = [
      {
        id: '1',
        amount: 100,
        type: 'income',
        category: 'Salary',
        description: 'Payday',
        date: '2026-08-01T00:00:00.000Z',
      },
      {
        id: '2',
        amount: 35,
        type: 'expense',
        category: 'Food',
        description: 'Dinner',
        date: '2026-08-02T00:00:00.000Z',
      },
      {
        id: '3',
        amount: 15,
        type: 'expense',
        category: 'Transport',
        description: 'Metro',
        date: '2026-08-03T00:00:00.000Z',
      },
    ];

    expect(computeSummary(transactions)).toEqual({
      totalIncome: 100,
      totalExpense: 50,
      balance: 50,
    });
  });

  it('returns zero totals for an empty list', () => {
    expect(computeSummary([])).toEqual({
      totalIncome: 0,
      totalExpense: 0,
      balance: 0,
    });
  });
});

describe('format helpers', () => {
  it('formats currency and dates', () => {
    expect(formatCurrency(1200)).toBe('$1,200');
    expect(formatDate('2026-08-15T09:30:00.000Z')).toBe('Aug 15, 2026');
  });
});

describe('transactionFormSchema', () => {
  it('accepts valid form input and coerces amount', () => {
    expect(
      transactionFormSchema.parse({
        amount: '42',
        type: 'expense',
        category: 'Food',
        description: 'Coffee',
      }),
    ).toEqual({
      amount: 42,
      type: 'expense',
      category: 'Food',
      description: 'Coffee',
    });
  });

  it('rejects invalid form input', () => {
    const result = transactionFormSchema.safeParse({
      amount: 0,
      type: 'income',
      category: '',
      description: 'No',
    });

    expect(result.success).toBe(false);
  });
});
