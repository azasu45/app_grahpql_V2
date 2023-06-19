'use client';
import React from 'react';
import ModalCSP from '@app/components/modal';

function CobrosAgregarModal({ callback }: { callback?: () => void }) {
   const [open, setOpen] = React.useState<boolean>(false);

   const handleOpen = (force?: boolean) => {
      if (callback) callback();
      setOpen(force ? force : !open);
   };

   return (
      <ModalCSP
         title='Agregar Cobro'
         open={open}
         handleOpen={handleOpen}>
         cobrosAgregarModal
      </ModalCSP>
   );
}

export default CobrosAgregarModal;
