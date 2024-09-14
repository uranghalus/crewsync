'use server';

import { z } from 'zod';
import { RegisterSchema } from '../schema/auth-schema';
import { hashPassword } from '../utils';
import { getUserByEmail } from '../data/user';
import { prisma } from '../prisma';

export const RegisterService = async (
  values: z.infer<typeof RegisterSchema>
) => {
  const validatedFields = RegisterSchema.parse(values);
  if (!validatedFields) {
    return {
      status: 500,
      message: 'Register Error!',
    };
  }

  const { email, name, password } = validatedFields;
  const { hash, salt } = await hashPassword(password);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { status: 500, message: 'Email Sudah Terdaftar!' };
  }
  const user = await prisma.user.create({
    data: {
      email: email,
      name: name,
      hash: hash,
      salt: salt,
      role: 'USER',
    },
  });
  if (!user) {
    return { status: 500, message: 'Pendaftaran Gagal.' };
  }
  return { status: 200, message: 'Pendaftaran Berhasil.' };
};
