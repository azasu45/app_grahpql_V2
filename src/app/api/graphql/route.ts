// Next.js Custom Route Handler: https://nextjs.org/docs/app/building-your-application/routing/router-handlers
import { createYoga } from 'graphql-yoga';
import { schema } from '@app/graphql/schema';
import { Session, getServerSession } from 'next-auth';
import { authOptions } from '@app/app/api/auth/[...nextauth]/route';

const { handleRequest } = createYoga<{ session: Session }>({
   schema,
   async context() {
      return { session: await getServerSession(authOptions) };
   },
   // While using Next.js file convention for routing, we need to configure Yoga to use the correct endpoint
   graphqlEndpoint: '/api/graphql',
   // Yoga needs to know how to create a valid Next response
   fetchAPI: { Response },
});

export { handleRequest as GET, handleRequest as POST };
