'use client';

export const dynamic = 'force-dynamic';

import { useSuspenseQuery, useBackgroundQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { MisPagosRecibidosDocument } from '@app/graphql/codegenGenerate/documents.generated';
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

  const [queryRef, methods] = useBackgroundQuery(MisPagosRecibidosDocument, {
    fetchPolicy: 'cache-first',
    variables: {
      skip: page * 10,
    },
    notifyOnNetworkStatusChange: true,
  });

  const { fetchMore, refetch } = methods;

  return (
    <>
      <PageBar />
      {/*<Pagos queryRef={queryRef} page={page} handleChangePage={handlePageChange} />*/}
    </>
  );
}
