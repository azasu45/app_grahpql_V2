'use client';

import { Text, Title } from '@tremor/react';
import React from 'react';
import SubNavbar from './subNavbar';
import ButtonBar from './pagosRecibidos/ButtonBar';

const navigation = [
{ name: 'Pagos Recibidos', href: '/paymonitor/cobros' },
    { name: 'Estadisticas', href: '/paymonitor/cobros/es' },
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
         </div>
         <Text>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed ipsa
            eligendi voluptatibus.
         </Text>
         <SubNavbar navlinks={navigation} />
         <ButtonBar />
         {children}
      </>
   );
}
