'use client';

import { ApolloLink, HttpLink, SuspenseCache } from '@apollo/client';

import {
   NextSSRApolloClient,
   ApolloNextAppProvider,
   NextSSRInMemoryCache,
   SSRMultipartLink,
} from '@apollo/experimental-nextjs-app-support/ssr';
import clientCookies from 'js-cookie';
import { loadErrorMessages, loadDevMessages } from '@apollo/client/dev';
import { setVerbosity } from 'ts-invariant';
import { env } from '@app/env.mjs';

if (process.env.NODE_ENV === 'development') {
   setVerbosity('debug');
   loadDevMessages();
   loadErrorMessages();
}

function makeSuspenseCache() {
   return new SuspenseCache();
}

export function ApolloWrapper({
   children,
   delay: delayProp,
   token: tokenProp,
   csrf: csrfProp,
}: React.PropsWithChildren<{ delay: number; token: string; csrf: string }>) {
   return (
      <ApolloNextAppProvider makeClient={makeClient} makeSuspenseCache={makeSuspenseCache}>
         {children}
      </ApolloNextAppProvider>
   );

   function makeClient() {
      const httpLink = new HttpLink({
         uri: `${process.env.NEXT_PUBLIC_URI ?? 'http://localhost:3000/api/graphql'}`,
         fetchOptions: { cache: 'no-store' },
      });

      const delayLink = new ApolloLink((operation, forward) => {
         const delay =
            typeof window === 'undefined'
               ? delayProp
               : clientCookies.get('apollo-x-custom-delay') ?? delayProp;

         const authSessionToken =
            typeof window === 'undefined'
               ? tokenProp
               : clientCookies.get('next-auth.session-token') ?? tokenProp;

         const csrfToken =
            typeof window === 'undefined'
               ? csrfProp
               : clientCookies.get('next-auth.csrf-token') ?? csrfProp;

         operation.setContext(({ headers = {} }) => {
            return {
               headers: {
                  ...headers,
                  'x-custom-delay': delay,
                  cookie: `next-auth.csrf-token=${csrfToken} ; next-auth.session-token=${authSessionToken}`,
               },
            };
         });
         return forward(operation);
      });

      return new NextSSRApolloClient({
         cache: new NextSSRInMemoryCache(),
         link:
            typeof window === 'undefined'
               ? ApolloLink.from([
                    // in a SSR environment, if you use multipart features like
                    // @defer, you need to decide how to handle these.
                    // This strips all interfaces with a `@defer` directive from your queries.
                    new SSRMultipartLink({
                       stripDefer: true,
                       cutoffDelay: 100,
                    }),
                    delayLink,
                    httpLink,
                 ])
               : ApolloLink.from([delayLink, httpLink]),
      });
   }
}
