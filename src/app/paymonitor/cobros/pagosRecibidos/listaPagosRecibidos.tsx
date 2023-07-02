'use client';

export const dynamic = 'force-dynamic';

import { useState } from 'react';
import { MisPagosRecibidosDocument } from '@app/graphql/codegenGenerate/documents.generated';
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { Pagos } from '@app/components/pagos';

export default function ListaPagosRecibidos() {
   const [page, setPage] = useState(0);

   const { data, fetchMore } = useSuspenseQuery(MisPagosRecibidosDocument, {
      fetchPolicy: 'cache-first',
      variables: {
         skip: page * 10,
      },
      notifyOnNetworkStatusChange: true,
   });

   const handleChangePage = async (
      event: React.MouseEvent<HTMLButtonElement> | null,
      newPage: number,
   ) => {
      setPage(newPage);
      await fetchMore({
         variables: {
            skip: page * 10,
         },
      });
   };

   return (
      <>
         <Pagos
            pagos={data.misPagosRecibidos}
            page={0}
            pagosCount={1}
            handleChangePage={handleChangePage}
         />
      </>
   );
}
