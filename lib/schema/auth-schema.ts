import * as z from 'zod';

export const LoginSchema = z.object({
  password: z.string().min(1, {
    message: 'Password is required',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address',
  }),
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
