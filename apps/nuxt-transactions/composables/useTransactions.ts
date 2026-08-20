import { computed, onMounted, ref, watch } from 'vue';
import {
  computeSummary,
  transactionFormSchema,
  type Transaction,
  type TransactionFormInput,
  type TransactionType,
} from '@transactions/shared';
import { transactions as mockTransactions } from '@transactions/shared/mock-data';

type TypeFilter = TransactionType | 'all';
type Filters = { q: string; type: TypeFilter };

function readType(value: unknown): TypeFilter {
  return value === 'income' || value === 'expense' ? value : 'all';
}

export function useTransactions() {
  const apiUrl = import.meta.env.NUXT_PUBLIC_API_URL || '';
  const transactions = ref<Transaction[]>([]);
  const loading = ref(true);
  const error = ref('');
  const submitting = ref(false);
  const submitError = ref('');
  const q = ref('');
  const type = ref<TypeFilter>('all');

  const filters = computed<Filters>(() => ({ q: q.value, type: type.value }));

  let debounceId: ReturnType<typeof setTimeout> | undefined;
  watch(q, () => {
    clearTimeout(debounceId);
    debounceId = setTimeout(syncUrl, 350);
  });

  watch(type, syncUrl);

  function syncUrl() {
    if (typeof window === 'undefined') return;

    const url = new URL(window.location.href);
    q.value.trim() ? url.searchParams.set('q', q.value.trim()) : url.searchParams.delete('q');
    type.value === 'all' ? url.searchParams.delete('type') : url.searchParams.set('type', type.value);
    window.history.replaceState({}, '', `${url.pathname}${url.search}`);
  }

  function setFilters(patch: Partial<Filters>) {
    if (patch.q !== undefined) q.value = patch.q;
    if (patch.type !== undefined) type.value = patch.type;
  }

  async function retry() {
    await loadTransactions();
  }

  async function loadTransactions() {
    loading.value = true;
    error.value = '';

    if (!apiUrl) {
      transactions.value = [...mockTransactions].sort((a, b) => b.date.localeCompare(a.date));
      loading.value = false;
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/transactions`);
      if (!response.ok) throw new Error('Could not load transactions.');
      const data = (await response.json()) as Transaction[];
      transactions.value = data.sort((a, b) => b.date.localeCompare(a.date));
    } catch {
      error.value = 'Could not load transactions.';
    } finally {
      loading.value = false;
    }
  }

  const filteredTransactions = computed(() => {
    const term = q.value.trim().toLowerCase();
    return transactions.value.filter((transaction) => {
      const matchesType = type.value === 'all' || transaction.type === type.value;
      const matchesQuery = !term || transaction.description.toLowerCase().includes(term);
      return matchesType && matchesQuery;
    });
  });

  const summary = computed(() => computeSummary(filteredTransactions.value));

  async function createTransaction(input: TransactionFormInput) {
    const parsed = transactionFormSchema.parse(input);
    const optimistic: Transaction = {
      ...parsed,
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
    };

    submitting.value = true;
    submitError.value = '';
    transactions.value = [optimistic, ...transactions.value];

    if (!apiUrl) {
      submitting.value = false;
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/transactions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(optimistic),
      });
      if (!response.ok) throw new Error('Create failed');
    } catch {
      transactions.value = transactions.value.filter((transaction) => transaction.id !== optimistic.id);
      submitError.value = 'Transaction was not saved. Please try again.';
      throw new Error('Transaction was not saved.');
    } finally {
      submitting.value = false;
    }
  }

  onMounted(() => {
    const params = new URLSearchParams(window.location.search);
    q.value = params.get('q') ?? '';
    type.value = readType(params.get('type'));
    void loadTransactions();
  });

  return {
    filters,
    filteredTransactions,
    summary,
    loading,
    error,
    submitting,
    submitError,
    setFilters,
    createTransaction,
    retry,
  };
}
