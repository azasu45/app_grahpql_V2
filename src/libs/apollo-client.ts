import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from '@apollo/client';
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support/rsc';
import { cookies } from 'next/headers';
import { env } from '@app/env.mjs';

export const { getClient } = registerApolloClient(() => {
   const cookieStore = cookies();

   const cookieNextAuth = `${env.NODE_ENV === 'production' ? '__Secure-next-auth' : 'next-auth'}`;
   const cookieCsrfToken = `${env.NODE_ENV === 'production' ? '__Host-next-auth' : 'next-auth'}`;

   const authToken = String(cookieStore.get(`${cookieNextAuth}.session-token`)?.value ?? '');
   const csrfToken = String(cookieStore.get(`${cookieCsrfToken}.csrf-token`)?.value ?? '');

   const httpLink = new HttpLink({
      uri: `${env.NEXT_PUBLIC_URI}`,
   });

   const CookieLink = new ApolloLink((operation, forward) => {
      operation.setContext(({ headers = {} }) => {
         return {
            headers: {
               ...headers,
               'x-custom-delay': 1000,
               cookie: `${cookieCsrfToken}.csrf-token=${csrfToken} ; ${cookieNextAuth}.session-token=${authToken}`,
            },
         };
      });
      return forward(operation);
   });

   return new ApolloClient({
      cache: new InMemoryCache(),
      link: ApolloLink.from([CookieLink, httpLink]),
   });
});
