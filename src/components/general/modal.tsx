'use client';

import { ElementType, Fragment, PropsWithChildren } from 'react';
import { Icon, Title } from '@tremor/react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/solid';

const size = {
  complete: 'full',
};

interface ModalProps extends PropsWithChildren {
  buttonTitle?: string;
  icon?: ElementType;
  title?: string;
  handleOpen: (force?: boolean) => void;
  open: boolean;
}

const Modal = ({ children, handleOpen, open, title = '' }: ModalProps) => {
  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as='div' className='relative z-10' onClose={() => handleOpen(false)}>
        <Transition.Child
          as={Fragment}
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
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'>
              <Dialog.Panel
                className={
                  'h-full transform overflow-hidden rounded-2xl bg-tremor-background p-6 text-left align-middle shadow-xl transition-all dark:bg-dark-tremor-background'
                }>
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
  );
};

export default Modal;
