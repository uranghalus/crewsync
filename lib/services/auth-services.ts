'use server';

import { z } from 'zod';
import { LoginSchema, RegisterSchema } from '../schema/auth-schema';
import { hashPassword } from '../utils';
import { getUserByEmail } from '../data/user';
import { prisma } from '../prisma';
import { signIn, signOut } from '../auth/auth';
import { DEFAULT_LOGIN_REDIRECT } from '../routes';
import { AuthError } from 'next-auth';
// import { generateVerificationToken } from '../tokens';
// import { sendVerificationEmail } from '../mail';

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

  // const verificationToken = await generateVerificationToken(email);
  // if (verificationToken) {
  //   await sendVerificationEmail(email, verificationToken.token);

  //   return { status: 200, message: 'Konfirmasi email telah terkirim' };
  // }
  return { status: 200, message: 'Berhasil Registrasi!' };
};

export const LoginService = async (values: z.infer<typeof LoginSchema>) => {
  const valdatedFields = LoginSchema.safeParse(values);
  if (!valdatedFields.success) {
    return { status: 500, message: 'Ada Kesalahan' };
  }
  const { email, password } = valdatedFields.data;
  try {
    const existingUser = await getUserByEmail(email);
    if (!existingUser || !existingUser.email) {
      return { status: 500, message: 'Email tidak ditemukan' };
    }
    // if (!existingUser.emailVerified) {
    //   const verificationToken = await generateVerificationToken(
    //     existingUser.email
    //   );
    //   if (verificationToken)
    //     return { status: 200, message: 'Email Konfirmasi Telah Terkirim!' };
    // }
    await signIn('credentials', {
      email: email,
      password: password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return {
            status: 500,
            message: 'Email atau password masukkan salah!',
          };
        default:
          return { status: 500, message: 'Ada Sesuai Yang Salah Nih' };
      }
    }
    throw error;
  }
};
export const logoutService = async () => {
  await signOut({
    redirectTo: '/',
  });
};
