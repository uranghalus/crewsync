'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { RegisterSchema } from '@/lib/schema/auth-schema';
import { RegisterService } from '@/lib/services/auth-services';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import {
  RiErrorWarningLine,
  RiLoader2Line,
  RiShieldCheckLine,
} from 'react-icons/ri';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { z } from 'zod';
import useSWR from 'swr';
import { fetcher } from '@/lib/utils';
interface Department {
  id: number;
  department_name: string;
}
const SignupForm = () => {
  const [isPending, startTransition] = useTransition();
  const [errors, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: '',
      password: '',
      name: '',
      department: 'Silahkan Pilih Departemen',
      jabatan: 'Silahkan Pilih Jabatan',
    },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError('');
    setSuccess('');
    startTransition(async () => {
      await RegisterService(values).then((data) => {
        if (data?.status === 500) {
          setError(data.message);
        } else {
          setSuccess(data.message);
          form.reset();
        }
      });
    });
  };
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await fetch('/api/department');
        const data = await response.json();
        setDepartments(data);
      } catch (error) {
        setError('Failed to load departments');
      } finally {
        setLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {(errors || success) && (
          <Alert variant={errors ? 'destructive' : 'success'} className="my-3">
            {errors ? (
              <RiErrorWarningLine className="h-4 w-4" />
            ) : (
              <RiShieldCheckLine className="h-4 w-4" />
            )}
            <AlertTitle>{errors ? 'Oops!' : 'Yeay!'}</AlertTitle>
            <AlertDescription>{errors || success}</AlertDescription>
          </Alert>
        )}
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
            name="jabatan"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Jabatan</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Silahkan Pilih Jabatan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="SPV">Supervisor</SelectItem>
                      <SelectItem value="STAFF">Staff</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="department"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Departemen</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Silahkan Pilih Departemen" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((department) => (
                        <SelectItem
                          key={department.id}
                          value={department.id as unknown as string}
                        >
                          {department.department_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
          {isPending ? (
            <>
              <RiLoader2Line className="size-5 text-white mr-2" /> Mohon Tunggu
            </>
          ) : (
            'Daftar'
          )}
        </Button>
      </form>
    </Form>
  );
};

export default SignupForm;
