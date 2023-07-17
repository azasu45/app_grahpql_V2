import PagosRealizados from './pagos/PagosRealizdos';
import PageProviders from './pagos/pageProviders';

function Page() {
  return (
    <PageProviders>
      <PagosRealizados />
    </PageProviders>
  );
}

export default Page;
