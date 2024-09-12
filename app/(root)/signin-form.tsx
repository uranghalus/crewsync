'use client';
import React, { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { LoginSchema } from '@/lib/schema/auth-schema';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Input } from '@/components/ui/input';

const SigninForm = () => {
  const [isPending, startTransition] = useTransition();
  // const [error, setError] = useState<string | undefined>('');
  // const [success, setSuccess] = useState<string | undefined>('');

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const onSubmit = () => {
    startTransition(() => {});
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Masukkan email"
                    type="email"
                    disabled={isPending}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center">
                  <FormLabel>Password</FormLabel>
                  <Link
                    href="/forgot-password"
                    className="ml-auto inline-block text-sm underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Masukkan password"
                    type="password"
                    disabled={isPending}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <Button
          disabled={isPending}
          variant={'default'}
          className="w-full"
          type="submit"
        >
          Sign In
        </Button>
      </form>
    </Form>
  );
};

export default SigninForm;
