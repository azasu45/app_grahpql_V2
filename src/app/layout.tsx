import { ApolloWrapper } from '@app/libs/apollo-wrapper';
import { cookies } from 'next/headers';
import Providers from './providers';
import './globals.css';

export const metadata = {
   title: 'Paymonitor',
   description: 'Generated by create next app',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
   const cookieStore = cookies();
   const delay = Number(cookieStore.get('apollo-x-custom-delay')?.value ?? 1000);
   const authToken = String(cookieStore.get('next-auth.session-token')?.value ?? '');
   const csrfToken = String(cookieStore.get('next-auth.csrf-token')?.value ?? '');

   return (
      <html lang='es' className='h-full bg-gray-50'>
         <body className='h-full'>
            <Providers>
               <ApolloWrapper delay={delay} token={authToken} csrf={csrfToken}>
                  {children}
               </ApolloWrapper>
            </Providers>
         </body>
      </html>
   );
}
