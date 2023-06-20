'use client';

import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { Flex, Icon, Subtitle } from '@tremor/react';
import React from 'react';
import CobrosModal from './list/cobrosModal';

function ButtonBar() {
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
         <div className='flex gap-1 flex-row flex-nowrap'></div>
      </Flex>
   );
}

export default ButtonBar;
