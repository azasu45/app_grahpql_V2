'use client';

import { Menu } from '@headlessui/react';
import {
   InformationCircleIcon,
   MagnifyingGlassIcon,
   PlusCircleIcon,
} from '@heroicons/react/24/outline';
import { Flex, Icon, TextInput, Subtitle, Button } from '@tremor/react';

import React from 'react';

function Filtros() {
   return (
      <>
         <div className='mt-4'>
            <Flex
               className='space-x-0.5'
               justifyContent='start'
               alignItems='center'>
               <Subtitle>Grupos</Subtitle>
               <Icon
                  icon={InformationCircleIcon}
                  variant='simple'
                  tooltip='descripción'
               />
            </Flex>
         </div>
         <div className='flex space-x-2'>
            <TextInput
               placeholder='Buscar por nombre'
               icon={MagnifyingGlassIcon}
            />
            <Menu>
               <Menu.Button>
                  <PlusCircleIcon className='h-6 w-6' />
               </Menu.Button>
            </Menu>
         </div>
      </>
   );
}

export default Filtros;
