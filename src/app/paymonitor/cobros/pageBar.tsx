'use client';

import { Flex, Subtitle, Icon } from '@tremor/react';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { PropsWithChildren } from 'react';

function PageBar({ children }: PropsWithChildren) {
  return (
    <Flex className='mt-4' alignItems='center'>
      <Flex className='space-x-0.5' justifyContent='start' alignItems='center'>
        <Subtitle>Cobros</Subtitle>
        <Icon icon={InformationCircleIcon} variant='simple' tooltip='descripción' />
      </Flex>
      <Flex
        flexDirection='row'
        alignItems='center'
        className='gap-1 flex-nowrap'
        justifyContent='end'>
        {children}
      </Flex>
    </Flex>
  );
}

export default PageBar;
