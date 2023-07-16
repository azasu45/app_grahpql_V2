export const dynamic = 'force-dynamic';

import PageProviders from './pageProviders';
import ListaCobros from './cobroList';

function Page() {
  return (
    <PageProviders>
      <ListaCobros />
    </PageProviders>
  );
}

export default Page;
