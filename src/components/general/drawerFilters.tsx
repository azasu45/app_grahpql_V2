'use client';

import React from 'react';
import { Icon } from '@tremor/react';
import { Dialog, Transition } from '@headlessui/react';
import { FunnelIcon } from '@heroicons/react/24/solid';

interface Props extends React.PropsWithChildren {
  title?: string;
  open: boolean;
  handleOpen: (force?: boolean) => void;
}

function DrawerFilters({ title = 'Title', open, handleOpen, children }: Props) {
  return (
    <>
      <Icon
        icon={FunnelIcon}
        size='sm'
        className='cursor-pointer'
        onClick={() => handleOpen()}></Icon>
      <Transition appear show={open} as={React.Fragment}>
        <Dialog onClose={() => handleOpen(false)} unmount={false}>
          <Transition.Child
            as={React.Fragment}
            enter='ease-out duration-300'
            enterFrom=' opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-300'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'>
            <div className='fixed inset-0 bg-black/30' />
          </Transition.Child>
          <Transition.Child
            as={React.Fragment}
            enter='transition ease-linear duration-500 transform'
            enterFrom='opacity-0 translate-y-full'
            enterTo='opacity-100 translate-y-0'
            leave='transition ease-linear duration-500 transform'
            leaveFrom='opacity-100 translate-y-0'
            leaveTo='opacity-0 translate-y-full'>
            <Dialog.Panel className=' fixed bottom-0 left-0 right-0 min-h-[70vh] w-full transform overflow-hidden bg-tremor-background dark:bg-dark-tremor-background p-6 text-left align-middle shadow-tremor-card dark:shadow-dark-tremor-card shadow-tremor-background dark:shadow-dark-tremor-background'>
              <Dialog.Title as='h3' className='text-lg font-medium leading-6 text-gray-900'>
                {title}
              </Dialog.Title>
              {children}
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
}

export default DrawerFilters;
