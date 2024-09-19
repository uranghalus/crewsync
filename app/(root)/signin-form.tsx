'use client';
import React, { useState, useTransition } from 'react';
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
import { LoginService } from '@/lib/services/auth-services';
// import { toast } from 'sonner';
import { useSearchParams } from 'next/navigation';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { RiErrorWarningLine, RiShieldCheckLine } from 'react-icons/ri';

const SigninForm = () => {
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const urlError =
    searchParams.get('error') === '0AuthAccountNotLinked'
      ? 'Email telah dipakai dengan provider berbeda'
      : '';
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    startTransition(async () => {
      await LoginService(values).then((data) => {
        if (data?.status === 500) {
          setError(data?.message);
          // toast.error('Login Gagal!', {
          //   description: data?.message || urlError,
          // });
        } else {
          // toast.success('Yeay!!', {
          //   description: data?.message
          setSuccess(data?.message);
        }
        form.reset();
      });
    });
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {(error || success) && (
          <Alert variant={error ? 'destructive' : 'success'} className="my-3">
            {error ? (
              // eslint-disable-next-line react/jsx-no-undef
              <RiErrorWarningLine className="h-4 w-4" />
            ) : (
              <RiShieldCheckLine className="h-4 w-4" />
            )}
            <AlertTitle>{error ? 'Oops!' : 'Yeay!'}</AlertTitle>
            <AlertDescription>{error || success || urlError}</AlertDescription>
          </Alert>
        )}
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
