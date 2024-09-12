import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      _id: string;
      role: 'HRD' | 'SPV' | 'USER' | 'ADMIN';
      profileImage: string;
    } & DefaultSession['user'];
  }
}
