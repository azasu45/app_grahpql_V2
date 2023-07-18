import { Suspense } from 'react';
import PagosRealizados from './PagosRealizdos';
import PageProviders from './pageProviders';

function Page() {
  return (
    <PageProviders>
      <Suspense>
        <PagosRealizados />
      </Suspense>
    </PageProviders>
  );
}

export default Page;
