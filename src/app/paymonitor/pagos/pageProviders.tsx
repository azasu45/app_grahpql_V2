'use client';

import { PropsWithChildren } from 'react';
import { DateRangePickerValue } from '@tremor/react';
import { FormProvider, useForm } from 'react-hook-form';

export type TypeFiltrosCobros = {
   descripcion: string;
   date: DateRangePickerValue;
};

interface props extends PropsWithChildren {}

export default function PageProviders({ children }: props) {
   const methods = useForm<TypeFiltrosCobros>();

   return <FormProvider {...methods}>{children}</FormProvider>;
}
