'use client';
import { Dialog, Transition } from '@headlessui/react';
import React from 'react';
import AllGrupos from './allGrupos';
import { Button, Icon } from '@tremor/react';
import {
   InformationCircleIcon,
   UserGroupIcon,
} from '@heroicons/react/24/outline';

function GruposModal({
   open,
   handleOpen,
}: {
   open: boolean;
   handleOpen: (force?: boolean) => void;
}) {
   return (
      <>
         <div className='flex items-center'>
            <Icon
               icon={InformationCircleIcon}
               variant='simple'
               tooltip='descripción'
               size='md'
            />
            <Button
               icon={UserGroupIcon}
               size='sm'
               onClick={() => handleOpen()}>
               Grupos
            </Button>
            <Transition
               appear
               show={open}
               as={React.Fragment}>
               <Dialog
                  as='div'
                  className='relative z-10'
                  onClose={() => handleOpen(false)}>
                  <Transition.Child
                     as={React.Fragment}
                     enter='ease-out duration-300'
                     enterFrom='opacity-0'
                     enterTo='opacity-100'
                     leave='ease-in duration-200'
                     leaveFrom='opacity-100'
                     leaveTo='opacity-0'>
                     <div className='fixed inset-0 bg-black bg-opacity-25' />
                  </Transition.Child>
                  <div className='fixed inset-0 overflow-y-auto'>
                     <div className='flex min-h-full items-center justify-center p-4 text-center'>
                        <Transition.Child
                           as={React.Fragment}
                           enter='ease-out duration-300'
                           enterFrom='opacity-0 scale-95'
                           enterTo='opacity-100 scale-100'
                           leave='ease-in duration-200'
                           leaveFrom='opacity-100 scale-100'
                           leaveTo='opacity-0 scale-95'>
                           <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                              <Dialog.Title
                                 as='h3'
                                 className='text-lg font-medium leading-6 text-gray-900'>
                                 Grupos
                              </Dialog.Title>
                              <AllGrupos />
                              <div className='mt-4'>
                                 <button
                                    type='button'
                                    className='inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2'
                                    onClick={() => handleOpen(false)}>
                                    !Cerrar
                                 </button>
                              </div>
                           </Dialog.Panel>
                        </Transition.Child>
                     </div>
                  </div>
               </Dialog>
            </Transition>
         </div>
      </>
   );
}

export default GruposModal;
