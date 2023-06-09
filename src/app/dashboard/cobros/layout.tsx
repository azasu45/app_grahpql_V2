'use client';

import { Text, Title } from '@tremor/react';
import React from 'react';
import SubNavbar from './subNavbar';
import Link from 'next/link';

const navigation = [
   { name: 'Cuentas', href: '/dashboard/cobros/cuentas' },
   { name: 'Grupos', href: '/dashboard/cobros/grupos' },
   { name: 'Participantes', href: '/dashboard/cobros/participantes' },
   { name: 'Cobros', href: '/dashboard/cobros/list' },
   { name: 'Pagos.R', href: '/dashboard/cobros/pagosRecibidos' },
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
               <Text color='amber'>Resumen</Text>
            </Link>
         </div>
         <Text>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed ipsa
            eligendi voluptatibus, soluta fugiat iste eum repellendus assumenda
            rem quisquam optio quia laboriosam!
         </Text>
         <SubNavbar navlinks={navigation} />
         {children}
      </>
   );
}
