import { NextAuthConfig } from 'next-auth';

export default {
  providers: [],
  callbacks: {
    jwt({ token, trigger, session }) {
      if (trigger === 'update') token.name = session?.user?.name;
      return token;
    },
  },
} satisfies NextAuthConfig;
