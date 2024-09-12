'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RegisterSchema } from '@/lib/schema/auth-schema';
import { zodResolver } from '@hookform/resolvers/zod';
// import Link from 'next/link';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
// import { toast } from 'sonner';
import { z } from 'zod';

const SignupForm = () => {
  const [isPending, startTransition] = useTransition();
  //   const [error, setError] = useState<string | undefined>('');
  //   const [success, setSuccess] = useState<string | undefined>('');

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: '',
      password: '',
      name: '',
    },
  });
  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    // setError('');
    // setSuccess('');
    startTransition(() => {
      console.log(values);
    });
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Masukkan Nama"
                    type="text"
                    disabled={isPending}
                  />
                </FormControl>
              </FormItem>
            )}
          />
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
                <FormLabel>Password</FormLabel>
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

export default SignupForm;
