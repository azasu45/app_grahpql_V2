import { HtmlChangesObserver } from '@app/components/HtmlChangesObserver';
import React from 'react';
import AllCuentas from './allCuentas';

export default function Page() {
   return (
      <HtmlChangesObserver>
         <AllCuentas />
      </HtmlChangesObserver>
   );
}
