'use client';

import Modal from '@app/components/general/modal';
import Pagar from '@app/components/pagos/pagar';
import { SquaresPlusIcon } from '@heroicons/react/24/outline';
import { Button, Icon } from '@tremor/react';

import { useState } from 'react';

export default function ModalPagar() {
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = (force?: boolean) => {
    setOpen(force ?? !open);
  };

  return (
    <>
      <div className='fixed bottom-6 right-6'>
        <Button
          size='md'
          color='sky'
          onClick={() => handleOpen(true)}
          className='relative w-[52px] h-[52px]'>
          <Icon
            className='text-tremor-content-inverted dark:text-dark-tremor-content'
            icon={SquaresPlusIcon}
          />
        </Button>
      </div>
      <Modal open={open} handleOpen={handleOpen} title='Pagar'>
        <Pagar callback={handleOpen} />
      </Modal>
    </>
  );
}
