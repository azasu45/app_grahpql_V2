'use client';

import { useState } from 'react';
import Drawer from '@app/components/general/drawer';

/*
   Si se quiere que el filtro tome el control de la transición y animación cuando se abra el filtro pasar 
   por children el contender a aplicar la animación   
**/

function FiltrosDrawer({ children }: React.PropsWithChildren) {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpenFilters = (force?: boolean) => {
    setOpen(force ?? !open);
  };

  return (
    <>
      <Drawer open={open} handleOpen={handleOpenFilters}>
        {children}
      </Drawer>
    </>
  );
}

export default FiltrosDrawer;
