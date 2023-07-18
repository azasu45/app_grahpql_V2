'use client';

export const dynamic = 'force-dynamic';

import { useBackgroundQuery } from '@apollo/experimental-nextjs-app-support/ssr';

import { Pagos } from '@app/components/pagos';

import { useFormContext } from 'react-hook-form';
import { usePagination } from '@app/hooks/usePagination';
import { MisPagosRealizadosDocument } from '@app/graphql/codegenGenerate/documents.generated';

import PageBar from './pageBar';
import { Suspense } from 'react';

// import FiltrosDrawer from './filtrosDrawer';
// import FiltrosForm from './filtrosForm';

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

  const [queryRef, result] = useBackgroundQuery(MisPagosRealizadosDocument, {
    fetchPolicy: 'cache-first',
    variables: {
      skip: (page - 1) * 10,
    },
    notifyOnNetworkStatusChange: true,
  });

  const { fetchMore } = result;

  // const onSubmit = handleSubmit(async (data) => {
  //   await refetch({
  //     skip: (page - 1) * 10,
  //     filtros: {
  //       referencia: data.descripcion,
  //       fechaDesde: data?.date?.from?.toString() ?? undefined,
  //       fechaHasta: data?.date?.to?.toString() ?? undefined,
  //     },
  //   });
  // });

  return (
    <>
      <PageBar>
        {/* <FiltrosDrawer>
          <form onSubmit={onSubmit}>
            <FiltrosForm />
          </form>
        </FiltrosDrawer> */}
      </PageBar>

      <Pagos queryRef={queryRef} page={page} handleChangePage={handlePageChange} />
    </>
  );
}
