'use client';

import { NetworkStatus } from '@apollo/client';
import { useEffect, useState } from 'react';
import Drawer from '@app/components/general/drawer';

/*
   Si se quiere que el filtro tome el control de la transición y animación cuando se abra el filtro pasar 
   por children el contender a aplicar la animación   
**/

function Filtros({ loading, children }: React.PropsWithChildren<{ loading?: NetworkStatus }>) {
   const [open, setOpen] = useState<boolean>(false);
   const handleOpenFilters = (force?: boolean) => {
      setOpen(force ?? !open);
   };
   useEffect(() => {
      if (loading === NetworkStatus.ready) setOpen(false);
   }, [loading]);

   return (
      <Drawer open={open} handleOpen={handleOpenFilters}>
         {children}
      </Drawer>
   );
}

export default Filtros;
