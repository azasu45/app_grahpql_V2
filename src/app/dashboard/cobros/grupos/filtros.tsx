'use client';

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
            <Button size='sm'>
               <PlusCircleIcon className='h-6 w-6' />
            </Button>
         </div>
      </>
   );
}

export default Filtros;
