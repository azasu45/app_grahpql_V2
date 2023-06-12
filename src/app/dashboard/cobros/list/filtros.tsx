'use client';

import { Menu } from '@headlessui/react';
import {
   InformationCircleIcon,
   MagnifyingGlassIcon,
   PlusCircleIcon,
} from '@heroicons/react/24/outline';
import {
   Flex,
   Icon,
   TextInput,
   Subtitle,
   Button,
   DateRangePicker,
   DateRangePickerValue,
} from '@tremor/react';

import React from 'react';
import GruposModal from './gruposModal';

function classNames(...classes: string[]) {
   return classes.filter(Boolean).join(' ');
}

function Filtros() {
   const [isOpen, setIsOpen] = React.useState<boolean>(false);

   const [value, setValue] = React.useState<DateRangePickerValue>({
      from: new Date(2023, 1, 1),
      to: new Date(),
   });

   const handleOpen = () => {
      setIsOpen(!isOpen);
   };

   return (
      <>
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
               <Menu>
                  <Menu.Button className='px-2 py-[6px] rounded-md bg-black bg-opacity-20 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75'>
                     <PlusCircleIcon className='h-6 w-6' />
                  </Menu.Button>
               </Menu>
            </div>
         </Flex>
         <Flex className='mt-1 gap-1 flex-wrap md:flex-nowrap'>
            <TextInput
               className='w-full'
               placeholder='Buscar por nombre'
               icon={MagnifyingGlassIcon}
            />
            <DateRangePicker className='mx-auto w-full' />
         </Flex>
      </>
   );
}

export default Filtros;
