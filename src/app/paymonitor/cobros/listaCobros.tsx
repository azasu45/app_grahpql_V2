'use client';

import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { Form, useFormContext } from 'react-hook-form';
import { useState } from 'react';
import { type DateRangePickerValue } from '@tremor/react';

import { CobrosDocument } from '@app/components/documents.generated';
import { useSession } from 'next-auth/react';
//* Components */
import CobroBar from './cobroBar';
import { Cobros } from '@app/components/cobros';

export type TypeFiltrosCobros = {
   descripcion: string;
   date: DateRangePickerValue;
};

function ListaCobros() {
   const [page, setPage] = useState<number>(0);

   const handleChangePage = (
      event: React.MouseEvent<HTMLButtonElement> | null,
      newPage: number,
   ) => {
      setPage(newPage);
      refetch();
   };

   const { handleSubmit, control } = useFormContext<TypeFiltrosCobros>();
   const { data, refetch } = useSuspenseQuery(CobrosDocument, {
      fetchPolicy: 'cache-first',
      variables: {
         skip: page * 10,
      },
      notifyOnNetworkStatusChange: true,
   });

   const onSubmit = handleSubmit(async (data) => {
      await refetch({
         filtros: {
            descripcion: data.descripcion,
            fechaDesde: data?.date?.from ?? undefined,
            fechaHasta: data?.date?.to ?? undefined,
         },
      });
   });

   return (
      <>
         <CobroBar onSubmit={onSubmit} />
         <div className='mt-2 h-[70%]'>
            <Cobros
               cobros={(data as any).cobros}
               cobrosCount={data.cobrosCount}
               page={page}
               handleChangePage={handleChangePage}
            />
         </div>
      </>
   );
}

export default ListaCobros;
