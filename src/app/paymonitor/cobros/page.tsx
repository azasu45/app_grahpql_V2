export const dynamic = 'force-dynamic';

import PageProviders from './pageProviders';
import ListaCobros from './CobroList'

function Page (){
   return (
      <PageProviders>
         <ListaCobros />
      </PageProviders>
   );
};

export default Page;
