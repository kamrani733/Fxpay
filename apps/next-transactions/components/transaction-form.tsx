'use client';

import { LoaderCircle, Plus } from 'lucide-react';
import { useState } from 'react';
import { transactionFormSchema, type TransactionFormInput } from '@transactions/shared';

const initialForm = {
  amount: '',
  type: 'expense',
  category: '',
  description: '',
};

type FormState = typeof initialForm;

export function TransactionForm({
  onSubmit,
  submitting,
  submitError,
}: {
  onSubmit: (input: TransactionFormInput) => Promise<void>;
  submitting: boolean;
  submitError: string;
}) {
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = transactionFormSchema.safeParse(form);
    if (!result.success) {
      setErrors(
        Object.fromEntries(result.error.issues.map((issue) => [issue.path[0], issue.message])) as Partial<
          Record<keyof FormState, string>
        >,
      );
      return;
    }

    setErrors({});
    await onSubmit(result.data);
    setForm(initialForm);
  }

  return (
    <form className="panel form-panel" onSubmit={handleSubmit}>
      <div>
        <p className="eyebrow">New entry</p>
        <h2>Add transaction</h2>
      </div>

      <label>
        Amount
        <input
          inputMode="decimal"
          value={form.amount}
          onChange={(event) => setForm({ ...form, amount: event.target.value })}
          placeholder="120"
        />
        {errors.amount ? <small>{errors.amount}</small> : null}
      </label>

      <label>
        Type
        <select
          value={form.type}
          onChange={(event) => setForm({ ...form, type: event.target.value as FormState['type'] })}
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
        {errors.type ? <small>{errors.type}</small> : null}
      </label>

      <label>
        Category
        <input
          value={form.category}
          onChange={(event) => setForm({ ...form, category: event.target.value })}
          placeholder="Food"
        />
        {errors.category ? <small>{errors.category}</small> : null}
      </label>

      <label>
        Description
        <input
          value={form.description}
          onChange={(event) => setForm({ ...form, description: event.target.value })}
          placeholder="Coffee with client"
        />
        {errors.description ? <small>{errors.description}</small> : null}
      </label>

      {submitError ? <p className="submit-error">{submitError}</p> : null}

      <button type="submit" className="submit-button" disabled={submitting}>
        {submitting ? <LoaderCircle className="spin" size={18} aria-hidden /> : <Plus size={18} aria-hidden />}
        Save transaction
      </button>
    </form>
  );
}
