'use client';

import { DateRangePickerValue, Text, Title } from '@tremor/react';
import SubNavbar from './pageNavbar';
import { FormProvider, useForm } from 'react-hook-form';

const navigation = [
   { name: 'Todos', href: '/paymonitor/cobros' },
   { name: 'Pagos Recibidos', href: '/paymonitor/cobros/pagosRecibidos' },
   { name: 'Estadisticas', href: '/paymonitor/cobros/estadisticas' },
];

export type TypeFiltrosCobros = {
   descripcion: string;
   date: DateRangePickerValue;
};

export default function Layout({ children }: { children: React.ReactNode }) {
   const methods = useForm<TypeFiltrosCobros>();

   return (
      <>
         <div className='flex items-center justify-between'>
            <Title>Cobros</Title>
         </div>
         <Text>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed ipsa eligendi voluptatibus.
         </Text>
         <SubNavbar navlinks={navigation} />
         <FormProvider {...methods}>{children}</FormProvider>
      </>
   );
}
