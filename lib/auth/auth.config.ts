import { NextAuthConfig } from 'next-auth';
import Google from 'next-auth/providers/google';
import Github from 'next-auth/providers/github';
import Credentials from 'next-auth/providers/credentials';
import { LoginSchema } from '../schema/auth-schema';
import { getUserByEmail } from '../data/user';
import { comparePassword } from '../utils';
import { prisma } from '../prisma';
export default {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    Github({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
    Credentials({
      authorize: async (credentials) => {
        const valdatedFields = LoginSchema.safeParse(credentials);
        if (valdatedFields.success) {
          const { email, password } = valdatedFields.data;
          const user = await getUserByEmail(email);
          if (!user) return null;

          const validPassword = await comparePassword(
            password,
            user.salt as string,
            user.hash as string
          );
          if (validPassword) return user;
        }
        return null;
      },
    }),
  ],
  events: {
    async linkAccount({ user }) {
      await prisma.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    // async signIn({ user, account }) {
    //   if (account?.provider !== 'credentials') return true;
    //   const existingUser = await getUserById(user.id as string);

    //   if (!existingUser?.emailVerified) return false;

    //   // Todo
    //   return true;
    // },
    async session({ token, session }) {
      console.log('Session Token:', token);
      return session;
    },
    async jwt({ token }) {
      return token;
    },
  },
} satisfies NextAuthConfig;
