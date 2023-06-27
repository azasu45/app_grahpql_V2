'use client';

import Modal from '@app/components/general/modal';
import Pagar from '@app/components/pagos/pagar';
import { useState } from 'react';

export default function ModalPagar() {
   const [open, setOpen] = useState<boolean>(false);
   const handleOpen = (force?: boolean) => {
      setOpen(force ?? !open);
   };

   return (
      <Modal open={open} handleOpen={handleOpen} title='Pagar'>
         <Pagar />
      </Modal>
   );
}
