'use client';

import React, { ElementType } from 'react';
import { Button, Icon, Title } from '@tremor/react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/solid';

interface ModalProps extends React.PropsWithChildren {
   icon?: ElementType;
   buttonTitle?: string;
   title?: string;
   handleOpen: (force?: boolean) => void;
   open: boolean;
}

const Modal = ({
   icon,
   buttonTitle = 'Button',
   children,
   handleOpen,
   open,
   title = '',
}: ModalProps) => {
   return (
      <>
         <div className='flex items-center'>
            <Button
               type='button'
               icon={icon}
               size='sm'
               onClick={() => handleOpen()}>
               {buttonTitle}
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
                           <Dialog.Panel className='w-full h-full transform overflow-hidden rounded-2xl bg-tremor-background p-6 text-left align-middle shadow-xl transition-all dark:bg-dark-tremor-background'>
                              <Dialog.Title
                                 as='div'
                                 className='flex justify-between items-center pb-4 mb-2 border-b sm:mb-3 dark:border-dark-tremor-background-emphasis'>
                                 <Title>{title}</Title>
                                 <Icon
                                    onClick={() => handleOpen(false)}
                                    className='cursor-pointer ml-auto text-tremor-content hover:text-tremor-content-emphasis dark:text-dark-tremor-content dark:hover:text-dark-tremor-content-emphasis'
                                    icon={XMarkIcon}
                                 />
                              </Dialog.Title>
                              {children}
                           </Dialog.Panel>
                        </Transition.Child>
                     </div>
                  </div>
               </Dialog>
            </Transition>
         </div>
      </>
   );
};

export default Modal;
