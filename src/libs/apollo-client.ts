import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from '@apollo/client';
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support/rsc';
import { cookies } from 'next/headers';

export const { getClient } = registerApolloClient(() => {
   const cookieStore = cookies();
   const authToken = String(cookieStore.get('next-auth.session-token')?.value ?? '');
   const csrfToken = String(cookieStore.get('next-auth.csrf-token')?.value ?? '');

   const httpLink = new HttpLink({
      uri: `${process.env.NEXT_PUBLIC_URI ?? 'http://localhost:3000/api/graphql'}`,
   });

   const CookieLink = new ApolloLink((operation, forward) => {
      operation.setContext(({ headers = {} }) => {
         return {
            headers: {
               ...headers,
               'x-custom-delay': 1000,
               cookie: `next-auth.csrf-token=${csrfToken} ; next-auth.session-token=${authToken}`,
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
