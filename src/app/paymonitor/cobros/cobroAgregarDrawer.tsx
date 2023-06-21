import { useState } from 'react';
import Drawer from '@app/components/drawer';
import { Button } from '@tremor/react';
import { PlusCircleIcon } from '@heroicons/react/24/outline';

function CobroAgregarDrawer() {
   const [open, setOpen] = useState<boolean>(false);

   const handleOpen = (force?: boolean) => {
      setOpen(force ?? !open);
   };

   return (
      <>
         <Button size='sm' iconPosition='right' icon={PlusCircleIcon}>
            <span className='hidden md:block'>Agregar Nuevo Cobro</span>
         </Button>
         <Drawer open={open} handleOpen={handleOpen}>
            {' Dravwe'}
         </Drawer>
      </>
   );
}

export default CobroAgregarDrawer;
