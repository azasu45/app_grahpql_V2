'use client';

import { Text, Title } from '@tremor/react';
import React from 'react';
import SubNavbar from './subNavbar';
import Link from 'next/link';

const navigation = [
   { name: 'Grupos', href: '/dashboard/cobros/grupos' },
   { name: 'Cobros', href: '/dashboard/cobros/list' },
   { name: 'Pagos Recibidos', href: '/dashboard/cobros/pagosRecibidos' },
];

export default async function Layout({
   children,
}: {
   children: React.ReactNode;
}) {
   return (
      <>
         <div className='flex justify-between items-center'>
            <Title>Cobros</Title>
            <Link
               href={{
                  pathname: '/dashboard/cobros',
               }}>
               <Text color='amber'>RESUMEN</Text>
            </Link>
         </div>
         <Text>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed ipsa
            eligendi voluptatibus.
         </Text>
         <SubNavbar navlinks={navigation} />
         {children}
      </>
   );
}
