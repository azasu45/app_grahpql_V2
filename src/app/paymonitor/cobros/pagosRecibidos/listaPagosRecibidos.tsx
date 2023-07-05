'use client';

export const dynamic = 'force-dynamic';

import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { Pagos } from '@app/components/pagos';
import { usePagination } from '@app/hooks/usePagination';
import { MisPagosRecibidosDocument } from '@app/graphql/codegenGenerate/documents.generated';

export default function ListaPagosRecibidos() {
   const { page, handlePageChange } = usePagination({
      onPageChange: () => {
         fetchMore({
            variables: {
               skip: (page - 1) * 10,
            },
         });
      },
   });

   const { data, fetchMore } = useSuspenseQuery(MisPagosRecibidosDocument, {
      fetchPolicy: 'cache-first',
      variables: {
         skip: page * 10,
      },
      notifyOnNetworkStatusChange: true,
   });

   return (
      <>
         <Pagos
            pagos={data.misPagosRecibidos}
            page={page}
            pagosCount={data.misPagosRecibidosCount}
            handleChangePage={handlePageChange}
         />
      </>
   );
}
