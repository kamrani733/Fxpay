'use client';

import { LoaderCircle, Plus } from 'lucide-react';
import { useState } from 'react';
import { transactionFormSchema, type TransactionFormInput } from '@transactions/shared';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select } from './ui/select';

const initialForm = {
  amount: '',
  type: 'expense',
  category: '',
  description: '',
};

type FormState = typeof initialForm;

export function TransactionForm({
  onSubmit,
  onSuccess,
  submitting,
  submitError,
}: {
  onSubmit: (input: TransactionFormInput) => Promise<void>;
  onSuccess?: () => void;
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
    onSuccess?.();
  }

  return (
    <form
      className="grid gap-4 rounded-lg border border-[#243445] bg-[#111821]/95 p-[18px] shadow-[0_20px_50px_rgba(0,0,0,0.22)]"
      onSubmit={handleSubmit}
    >
      <div>
        <p className="mb-2 text-xs font-bold uppercase text-[#7cb7ff]">New entry</p>
        <h2 id="next-add-transaction-title" className="m-0 text-[22px] tracking-normal">
          Add transaction
        </h2>
      </div>

      <label className="grid gap-[7px] text-sm text-[#9cadbd]">
        Amount
        <Input
          inputMode="decimal"
          value={form.amount}
          onChange={(event) => setForm({ ...form, amount: event.target.value })}
          placeholder="120"
        />
        {errors.amount ? <small className="text-[#ff5f73]">{errors.amount}</small> : null}
      </label>

      <label className="grid gap-[7px] text-sm text-[#9cadbd]">
        Type
        <Select
          value={form.type}
          onChange={(event) => setForm({ ...form, type: event.target.value as FormState['type'] })}
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </Select>
        {errors.type ? <small className="text-[#ff5f73]">{errors.type}</small> : null}
      </label>

      <label className="grid gap-[7px] text-sm text-[#9cadbd]">
        Category
        <Input
          value={form.category}
          onChange={(event) => setForm({ ...form, category: event.target.value })}
          placeholder="Food"
        />
        {errors.category ? <small className="text-[#ff5f73]">{errors.category}</small> : null}
      </label>

      <label className="grid gap-[7px] text-sm text-[#9cadbd]">
        Description
        <Input
          value={form.description}
          onChange={(event) => setForm({ ...form, description: event.target.value })}
          placeholder="Coffee with client"
        />
        {errors.description ? <small className="text-[#ff5f73]">{errors.description}</small> : null}
      </label>

      {submitError ? <p className="m-0 text-[#ff5f73]">{submitError}</p> : null}

      <Button type="submit" disabled={submitting}>
        {submitting ? <LoaderCircle className="animate-spin" size={18} aria-hidden /> : <Plus size={18} aria-hidden />}
        Save transaction
      </Button>
    </form>
  );
}
