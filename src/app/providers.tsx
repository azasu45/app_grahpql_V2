'use client';
import React from 'react';
import { SessionProvider } from 'next-auth/react';
import { ApolloWrapper } from '@app/libs/apollo-wrapper';

export default function Providers({ children }: React.PropsWithChildren) {
   return (
      <SessionProvider>
         <ApolloWrapper>{children}</ApolloWrapper>
      </SessionProvider>
   );
}
