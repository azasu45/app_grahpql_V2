import Navbar from './navbar';
import { getServerSession } from 'next-auth';
import React from 'react';
import { authOptions } from '../api/auth/[...nextauth]/route';

export default async function Nav() {
   const session = await getServerSession(authOptions);
   const user = session?.user;

   return <Navbar user={user} />;
}
