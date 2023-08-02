import NextAuth, { DefaultSession, NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import { prisma } from '@app/graphql/db';
import { PrismaAdapter } from '@next-auth/prisma-adapter';

import { env } from '@app/env.mjs';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string;
      token: string;
      complete: boolean;
      // ...other properties
    } & DefaultSession['user'];
  }

  interface User {
    complete: boolean;
    // ...other properties
    token: string;
  }
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'database',
  },
  adapter: PrismaAdapter(prisma),
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
        session.user.image = user.image;
        session.user.name = user.name;
        session.user.complete = user.complete;
      }
      return session;
    },
    redirect: ({ url, baseUrl }) => {
      console.log(url, 'url');
      console.log(baseUrl, 'base Url');

      return baseUrl;
    },
  },
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: env.GOOGLE_CLIENT_SECRET ?? '',
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
