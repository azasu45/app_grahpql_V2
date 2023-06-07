import { HtmlChangesObserver } from '@app/components/HtmlChangesObserver';
import React from 'react';
import AllCobros from './allCobros';

function Page() {
   return (
      <HtmlChangesObserver>
         <AllCobros/>
      </HtmlChangesObserver>
   );
}

export default Page;
