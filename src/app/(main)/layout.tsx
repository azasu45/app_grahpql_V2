import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import Navbar from './navbar';

export default async function Template({ children }: { children: React.ReactNode }) {
   const session = await getServerSession(authOptions);

   return (
      <>
         <header>
            <Navbar user={session?.user} />
         </header>

         <main className='mx-auto max-w-7xl min-h-[calc(100vh-64px)] flex flex-col'>
            {children}
         </main>
      </>
   );
}
