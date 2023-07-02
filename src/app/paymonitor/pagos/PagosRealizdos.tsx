'use client';

export const dynamic = 'force-dynamic';

import { MisPagosRealizadosDocument } from '@app/graphql/codegenGenerate/documents.generated';
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { Pagos } from '@app/components/pagos';
import { usePagination } from '@app/hooks/usePagination';

export default function PagosRealizados() {
   const { page, handlePageChange } = usePagination({
      onPageChange: () => {
         fetchMore({
            variables: {
               skip: (page - 1) * 10,
            },
         });
      },
   });

   const { data, fetchMore } = useSuspenseQuery(MisPagosRealizadosDocument, {
      fetchPolicy: 'cache-first',
      variables: {
         skip: (page - 1) * 10,
      },
      notifyOnNetworkStatusChange: true,
   });

   return (
      <>
         <Pagos
            pagos={data.misPagosRealizados}
            page={page}
            pagosCount={1}
            handleChangePage={handlePageChange}
         />
      </>
   );
}
