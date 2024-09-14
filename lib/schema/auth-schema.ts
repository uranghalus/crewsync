import * as z from 'zod';

export const LoginSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .min(1, 'Email is required')
    .email('Invalid email'),
  password: z
    .string({ required_error: 'Password is required' })
    .min(1, 'Password is required')
    .min(8, 'Password must be more than 8 characters')
    .max(32, 'Password must be less than 32 characters'),
});
export const RegisterSchema = z.object({
  name: z.string().min(6, {
    message: 'Nama Wajib Di Isi',
  }),
  password: z.string().min(6, {
    message: 'Password minimal 6 karakter',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address',
  }),
});
