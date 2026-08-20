<script setup lang="ts">
import { reactive, ref } from 'vue';
import { transactionFormSchema, type TransactionFormInput } from '@transactions/shared';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select } from './ui/select';

const props = defineProps<{
  submitting: boolean;
  submitError: string;
  onSubmit: (input: TransactionFormInput) => Promise<void>;
}>();

const initialForm = {
  amount: '',
  type: 'expense',
  category: '',
  description: '',
};

const form = reactive({ ...initialForm });
const errors = ref<Partial<Record<keyof typeof initialForm, string>>>({});

async function handleSubmit() {
  const result = transactionFormSchema.safeParse(form);
  if (!result.success) {
    errors.value = Object.fromEntries(result.error.issues.map((issue) => [issue.path[0], issue.message])) as Partial<
      Record<keyof typeof initialForm, string>
    >;
    return;
  }

  errors.value = {};
  await props.onSubmit(result.data);
  Object.assign(form, initialForm);
}
</script>

<template>
  <form
    class="sticky top-4 grid gap-3.5 border-[3px] border-[#172033] bg-white p-4 shadow-[8px_8px_0_#172033] max-[820px]:static"
    @submit.prevent="handleSubmit"
  >
    <header>
      <span class="mb-1.5 block text-xs uppercase text-gray-500">New transaction</span>
      <h2 class="m-0 text-[22px] tracking-normal">Write a line</h2>
    </header>

    <label class="grid gap-1.5 text-[13px] uppercase text-gray-500">
      Amount
      <Input
        v-model="form.amount"
        inputmode="decimal"
        placeholder="120"
      />
      <small v-if="errors.amount" class="text-[#d13f5d] normal-case">{{ errors.amount }}</small>
    </label>

    <label class="grid gap-1.5 text-[13px] uppercase text-gray-500">
      Type
      <Select
        v-model="form.type"
      >
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </Select>
      <small v-if="errors.type" class="text-[#d13f5d] normal-case">{{ errors.type }}</small>
    </label>

    <label class="grid gap-1.5 text-[13px] uppercase text-gray-500">
      Category
      <Input
        v-model="form.category"
        placeholder="Food"
      />
      <small v-if="errors.category" class="text-[#d13f5d] normal-case">{{ errors.category }}</small>
    </label>

    <label class="grid gap-1.5 text-[13px] uppercase text-gray-500">
      Description
      <Input
        v-model="form.description"
        placeholder="Coffee with client"
      />
      <small v-if="errors.description" class="text-[#d13f5d] normal-case">{{ errors.description }}</small>
    </label>

    <p v-if="submitError" class="m-0 text-[#d13f5d]">{{ submitError }}</p>

    <Button
      type="submit"
      :disabled="submitting"
    >
      <span
        v-if="submitting"
        class="h-4 w-4 animate-spin rounded-full border-2 border-[#172033] border-t-transparent"
        aria-hidden="true"
      />
      <span v-else aria-hidden="true">+</span>
      Save
    </Button>
  </form>
</template>
