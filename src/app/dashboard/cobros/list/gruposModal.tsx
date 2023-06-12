'use client';
import { Dialog, Transition } from '@headlessui/react';
import React from 'react';
import AllGrupos from './allGrupos';
import { Icon } from '@tremor/react';
import { InformationCircleIcon } from '@heroicons/react/24/outline';

function GruposModal({
   open,
   handleOpen,
}: {
   open: boolean;
   handleOpen: () => void;
}) {
   return (
      <>
         <div className='flex items-center'>
            <Icon
               icon={InformationCircleIcon}
               variant='simple'
               tooltip='descripción'
            />
            <button
               onClick={handleOpen}
               className='px-2 py-[6px] rounded-md bg-black bg-opacity-20 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75'>
               Grupos
            </button>
            <Transition
               appear
               show={open}
               as={React.Fragment}>
               <Dialog
                  as='div'
                  className='relative z-10'
                  onClose={() => {}}>
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
                           <Dialog.Panel>
                              <Dialog.Title
                                 as='h3'
                                 className='text-lg font-medium leading-6 text-gray-900'>
                                 Grupos
                              </Dialog.Title>
                              <AllGrupos />
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
