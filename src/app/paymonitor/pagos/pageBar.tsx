'use client';

import { Flex, Subtitle, Icon } from '@tremor/react';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { PropsWithChildren } from 'react';

function PageBar({ children }: PropsWithChildren) {
  return (
    <Flex className='mt-2' alignItems='center'>
      <Flex className='space-x-0.5' justifyContent='start' alignItems='center'>
        <Subtitle>Pagos</Subtitle>
        <Icon icon={InformationCircleIcon} variant='simple' tooltip='descripción' />
      </Flex>
      <Flex flexDirection='row' alignItems='center' className='gap-1'>
        {children}
      </Flex>
    </Flex>
  );
}

export default PageBar;
