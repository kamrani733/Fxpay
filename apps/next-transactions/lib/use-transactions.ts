'use client';

import { useCallback, useEffect, useMemo, useState, useTransition } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
  computeSummary,
  transactionFormSchema,
  type Transaction,
  type TransactionFormInput,
  type TransactionType,
} from '@transactions/shared';
import { transactions as mockTransactions } from '@transactions/shared/mock-data';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
type TypeFilter = TransactionType | 'all';
type Filters = { q: string; type: TypeFilter };

function normalizeType(value: string | null): TypeFilter {
  return value === 'income' || value === 'expense' ? value : 'all';
}

export function useTransactions() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [query, setQuery] = useState(searchParams.get('q') ?? '');

  const filters = useMemo<Filters>(
    () => ({ q: query, type: normalizeType(searchParams.get('type')) }),
    [query, searchParams],
  );

  const syncUrl = useCallback(
    (next: Filters) => {
      const params = new URLSearchParams(searchParams.toString());
      next.q ? params.set('q', next.q) : params.delete('q');
      next.type === 'all' ? params.delete('type') : params.set('type', next.type);
      const url = params.toString() ? `${pathname}?${params}` : pathname;
      startTransition(() => router.replace(url, { scroll: false }));
    },
    [pathname, router, searchParams],
  );

  const setFilters = useCallback(
    (patch: Partial<Filters>) => {
      const next = { ...filters, ...patch };
      if (patch.q !== undefined) setQuery(patch.q);
      if (patch.type !== undefined) syncUrl(next);
    },
    [filters, syncUrl],
  );

  useEffect(() => {
    const id = window.setTimeout(() => syncUrl({ ...filters, q: query }), 350);
    return () => window.clearTimeout(id);
  }, [filters.type, query, syncUrl]);

  const load = useCallback(async () => {
    setLoading(true);
    setError('');

    if (!API_URL) {
      setTransactions([...mockTransactions].sort((a, b) => b.date.localeCompare(a.date)));
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/transactions`);
      if (!response.ok) throw new Error('Could not load transactions.');
      const data = (await response.json()) as Transaction[];
      setTransactions(data.sort((a, b) => b.date.localeCompare(a.date)));
    } catch {
      setError('Could not reach the transaction API.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const filteredTransactions = useMemo(() => {
    const term = filters.q.trim().toLowerCase();
    return transactions.filter((transaction) => {
      const matchesType = filters.type === 'all' || transaction.type === filters.type;
      const matchesQuery = !term || transaction.description.toLowerCase().includes(term);
      return matchesType && matchesQuery;
    });
  }, [filters, transactions]);

  const createTransaction = useCallback(async (input: TransactionFormInput) => {
    const parsed = transactionFormSchema.parse(input);
    const optimistic: Transaction = {
      ...parsed,
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
    };

    setSubmitting(true);
    setSubmitError('');
    setTransactions((current) => [optimistic, ...current]);

    if (!API_URL) {
      setSubmitting(false);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/transactions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(optimistic),
      });
      if (!response.ok) throw new Error('Create failed');
    } catch {
      setTransactions((current) => current.filter((item) => item.id !== optimistic.id));
      setSubmitError('Transaction was not saved. Please try again.');
      throw new Error('Transaction was not saved.');
    } finally {
      setSubmitting(false);
    }
  }, []);

  return {
    filteredTransactions,
    summary: computeSummary(filteredTransactions),
    filters,
    setFilters,
    createTransaction,
    loading,
    error,
    retry: load,
    submitting,
    submitError,
  };
}
