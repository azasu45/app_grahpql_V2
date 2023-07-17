'use client';

export const dynamic = 'force-dynamic';

import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';

import { MisPagosRecibidosDocument } from '@app/graphql/codegenGenerate/documents.generated';
import { Pagos } from '@app/components/pagos';
import { usePagination } from '@app/hooks/usePagination';

import PageBar from './pageBar';

export default function PagosRecibidos() {
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
      <PageBar />
      <Pagos page={page} handleChangePage={handlePageChange} />
    </>
  );
}
