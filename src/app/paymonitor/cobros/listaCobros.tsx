'use client';

export const dynamic = 'force-dynamic';

import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { useFormContext } from 'react-hook-form';
import { useState } from 'react';
import { type DateRangePickerValue } from '@tremor/react';
import { CobrosDocument } from '@app/graphql/codegenGenerate/documents.generated';

//* Components */
import CobroBar from './cobroBar';
import { Cobros } from '@app/components/cobros';

export type TypeFiltrosCobros = {
   descripcion: string;
   date: DateRangePickerValue;
};

function ListaCobros() {
   const [page, setPage] = useState<number>(0);
   const { handleSubmit } = useFormContext<TypeFiltrosCobros>();

   const { data, refetch, fetchMore } = useSuspenseQuery(CobrosDocument, {
      fetchPolicy: 'cache-first',
      variables: {
         skip: page * 10,
      },
      notifyOnNetworkStatusChange: true,
   });

   const handleChangePage = (
      event: React.MouseEvent<HTMLButtonElement> | null,
      newPage: number,
   ) => {
      setPage(newPage);
      fetchMore({
         variables: {
            skip: page * 10,
         },
      });
   };

   const onSubmit = handleSubmit(async (data) => {
      await refetch({
         filtros: {
            descripcion: data.descripcion,
            fechaDesde: data?.date?.from?.toString() ?? undefined,
            fechaHasta: data?.date?.to?.toString() ?? undefined,
         },
      });
   });

   return (
      <>
         <CobroBar onSubmit={onSubmit} />
         <Cobros
            cobros={(data as any).cobros}
            cobrosCount={data.cobrosCount}
            page={page}
            handleChangePage={handleChangePage}
         />
      </>
   );
}

export default ListaCobros;
