import React, { Suspense } from 'react';
import Nav from './nav';

export default function Template({ children }: { children: React.ReactNode }) {
   return (
      <main>
         <Suspense fallback='...'>
            {/* @ts-expect-error Server Component */}
            <Nav />
         </Suspense>
         {children}
      </main>
   );
}
