'use client';

import Drawer from '@app/components/general/drawer';
import { NetworkStatus } from '@apollo/client';
import { useEffect, useState,PropsWithChildren } from 'react';
import { Icon } from '@tremor/react';
import { FunnelIcon } from '@heroicons/react/24/solid';

/*
   Si se quiere que el filtro tome el control de la transición y animación cuando se abra el filtro pasar 
   por children el contender a aplicar la animación   
**/

function FiltrosDrawer({ loading,children }: PropsWithChildren<{ loading?: NetworkStatus }>) {
   const [open, setOpen] = useState<boolean>(false);

   const handleOpenFilters = (force?: boolean) => {
      setOpen(force ?? !open);
   };

   useEffect(() => {
      if (loading === NetworkStatus.ready) setOpen(false);
   }, [loading]);

   return (
      <form>
         <Icon
            className='cursor-pointer ml-auto'
            icon={FunnelIcon}
            onClick={() => handleOpenFilters(true)}
            size='md'
         />
         <Drawer open={open} handleOpen={handleOpenFilters} title='Filtrar Pagos'>
            {children}
         </Drawer>
      </form>
   );
}

export default FiltrosDrawer;
