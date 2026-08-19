import { z } from 'zod';

export const transactionFormSchema = z.object({
  amount: z.coerce.number().positive('Amount must be greater than 0'),
  type: z.enum(['income', 'expense'], {
    required_error: 'Type is required',
  }),
  category: z.string().trim().min(1, 'Category is required'),
  description: z.string().trim().min(3, 'Description must be at least 3 characters'),
});

export type TransactionFormInput = z.infer<typeof transactionFormSchema>;
