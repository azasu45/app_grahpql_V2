import { usePagination } from '@app/hooks/usePagination';
import PagosRealizados from './PagosRealizdos';
import PageProviders from './pageProviders';

function Page() {
  return (
    <PageProviders>
      <PagosRealizados />
    </PageProviders>
  );
}

export default Page;
