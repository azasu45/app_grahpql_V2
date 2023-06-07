import React from 'react';
import AllGrupos from './allGrupos';
import { HtmlChangesObserver } from '@app/components/HtmlChangesObserver';

function Page() {
   return (
      <HtmlChangesObserver>
         <AllGrupos />
      </HtmlChangesObserver>
   );
}

export default Page;
