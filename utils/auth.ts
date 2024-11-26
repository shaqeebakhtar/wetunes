import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth, { DefaultSession } from 'next-auth';
import Google from 'next-auth/providers/google';
import GitHub from 'next-auth/providers/github';
import { db } from './db';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
    } & DefaultSession['user'];
  }
}

const {
  NEXTAUTH_SECRET,
  AUTH_GOOGLE_ID,
  AUTH_GOOGLE_SECRET,
  AUTH_GITHUB_ID,
  AUTH_GITHUB_SECRET,
  ENVIRONMENT,
} = process.env;

export const { handlers, auth } = NextAuth({
  adapter: PrismaAdapter(db),
  providers: [
    Google({
      clientId: AUTH_GOOGLE_ID as string,
      clientSecret: AUTH_GOOGLE_SECRET as string,
    }),
    GitHub({
      clientId: AUTH_GITHUB_ID as string,
      clientSecret: AUTH_GITHUB_SECRET as string,
    }),
  ],
  pages: {
    signIn: '/login',
  },
  secret: NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    jwt: async ({ token }) => {
      const user = await db.user.findUnique({
        where: { email: token?.email as string },
      });

      if (user) {
        token.id = user.id;
      }

      return token;
    },
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.id = token.id as string;
      }

      return session;
    },
  },
  debug: ENVIRONMENT === 'development',
});
