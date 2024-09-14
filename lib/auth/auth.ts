import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { LoginSchema } from '../schema/auth-schema';
import { getUserByEmail } from '../data/user';
import { comparePassword } from '../utils';
import { ZodError } from 'zod';
export const {} = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          const { email, password } = await LoginSchema.parseAsync(credentials);
          const user = await getUserByEmail(email);
          if (!user) {
            return {
              status: 500,
              message: 'Email Tidak Terdaftar!',
            };
          }
          const isValidPassword = await comparePassword(
            password,
            user.salt,
            user.hash
          );
          if (!isValidPassword) {
            return {
              status: 500,
              message: 'Password Salah!',
            };
          }
          return user;
        } catch (error) {
          if (error instanceof ZodError) {
            // Return `null` to indicate that the credentials are invalid
            return null;
          }
        }
      },
    }),
  ],
});
