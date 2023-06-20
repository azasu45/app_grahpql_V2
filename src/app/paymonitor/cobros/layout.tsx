'use client';

import { Text, Title } from '@tremor/react';
import React from 'react';
import SubNavbar from './subNavbar';
import ButtonBar from './ButtonBar';
import { FormProvider, useForm } from 'react-hook-form';

const navigation = [
   { name: 'Todos', href: '/paymonitor/cobros' },
   { name: 'Pagos Recibidos', href: '/paymonitor/cobros/pagosR' },
   { name: 'Estadisticas', href: '/paymonitor/cobros/es' },
];

export default async function Layout({
   children,
}: {
   children: React.ReactNode;
}) {
   const methods = useForm();

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
         <FormProvider {...methods}>
            <ButtonBar />
            {children}
         </FormProvider>
      </>
   );
}
