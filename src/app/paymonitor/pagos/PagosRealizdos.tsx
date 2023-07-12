'use client';

export const dynamic = 'force-dynamic';

import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { useFormContext } from 'react-hook-form';
import { usePagination } from '@app/hooks/usePagination';
import { MisPagosRealizadosDocument } from '@app/graphql/codegenGenerate/documents.generated';
import { Pagos } from '@app/components/pagos';
import PageBar from './pageBar';
import FiltrosDrawer from './filtrosDrawer';
import FiltrosForm from './filtrosForm';

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

  const { handleSubmit } = useFormContext();

  const { data, fetchMore, refetch } = useSuspenseQuery(MisPagosRealizadosDocument, {
    fetchPolicy: 'cache-first',
    variables: {
      skip: (page - 1) * 10,
    },
    notifyOnNetworkStatusChange: true,
  });

  const onSubmit = handleSubmit(async (data) => {
    await refetch({
      filtros: {
        referencia: data.descripcion,
        fechaDesde: data?.date?.from?.toString() ?? undefined,
        fechaHasta: data?.date?.to?.toString() ?? undefined,
      },
    });
  });

  return (
    <>
      <PageBar>
        <FiltrosDrawer>
          <form onSubmit={onSubmit}>
            <FiltrosForm />
          </form>
        </FiltrosDrawer>
      </PageBar>
      <Pagos
        pagos={data.misPagosRealizados}
        page={page}
        pagosCount={data.misPagosRealizadosCount}
        handleChangePage={handlePageChange}
      />
    </>
  );
}
