import Navbar from './navbar';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

export default async function Layout({ children }: { children: React.ReactNode }) {
   const session = await getServerSession(authOptions);
   const user = session?.user;

   if (!session) redirect('/api/auth/signin');

   return (
      <main>
         <Navbar user={user} />
         <div className='p-4 md:p-6 mx-auto max-w-7xl max-h-[calc(100vh-64px)] flex flex-col'>
            {children}
         </div>
      </main>
   );
}
