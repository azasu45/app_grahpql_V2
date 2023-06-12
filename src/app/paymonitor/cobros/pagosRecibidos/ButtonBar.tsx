'use client';

import { InformationCircleIcon, PlusIcon } from '@heroicons/react/24/outline';
import { Button, Flex, Icon, Subtitle } from '@tremor/react';
import React from 'react';
import GruposModal from '../list/gruposModal';
import { Menu, Transition } from '@headlessui/react';

function ButtonBar() {
   const [isOpen, setIsOpen] = React.useState<boolean>(false);
   const handleOpen = (force?: boolean) => {
      setIsOpen(force ? force : !isOpen);
   };

   return (
      <Flex
         className='mt-4'
         alignItems='center'>
         <Flex
            className='space-x-0.5'
            justifyContent='start'
            alignItems='center'>
            <Subtitle>Cobros</Subtitle>
            <Icon
               icon={InformationCircleIcon}
               variant='simple'
               tooltip='descripción'
            />
         </Flex>
         <div className='flex gap-1 flex-row flex-nowrap'>
            <GruposModal
               open={isOpen}
               handleOpen={handleOpen}
            />
            <Menu
               as={'div'}
               className='relative inline-block text-left'>
               <div>
                  <Menu.Button as={React.Fragment}>
                     <Button
                        size='sm'
                        icon={PlusIcon}>
                        Agregar mas ...
                     </Button>
                  </Menu.Button>
               </div>
               <Transition
                  as={React.Fragment}
                  enter='transition ease-out duration-100'
                  enterFrom='transform opacity-0 scale-95'
                  enterTo='transform opacity-100 scale-100'
                  leave='transition ease-in duration-75'
                  leaveFrom='transform opacity-100 scale-100'
                  leaveTo='transform opacity-0 scale-95'>
                  <Menu.Items className='absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-tremor-background shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50'>
                     <div className='px-1 py-1 '>
                        <Menu.Item>
                           {({ active }) => (
                              <button
                                 className={`${
                                    active
                                       ? 'bg-tremor-background-muted text-tremor-content-strong'
                                       : 'text-tremor-content-emphasis'
                                 } group flex w-full items-center rounded-md px-2 py-2 text-sm`}>
                                 Agregar Grupo
                              </button>
                           )}
                        </Menu.Item>
                        <Menu.Item>
                           {({ active }) => (
                              <button
                                 className={`${
                                    active
                                       ? 'bg-tremor-background-muted text-tremor-content-strong '
                                       : 'text-tremor-content-emphasis'
                                 } group flex w-full items-center rounded-md px-2 py-2 text-sm`}>
                                 Agregar Cobro
                              </button>
                           )}
                        </Menu.Item>
                     </div>
                  </Menu.Items>
               </Transition>
            </Menu>
         </div>
      </Flex>
   );
}

export default ButtonBar;
