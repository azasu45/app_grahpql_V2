'use client';

import { Flex, Subtitle, Icon } from '@tremor/react';
import { InformationCircleIcon } from '@heroicons/react/24/outline';

function PageBar() {
  return (
    <Flex className='mt-2' alignItems='center'>
      <Flex className='space-x-0.5' justifyContent='start' alignItems='center'>
        <Subtitle>Pagos</Subtitle>
        <Icon icon={InformationCircleIcon} variant='simple' tooltip='descripción' />
      </Flex>
    </Flex>
  );
}

export default PageBar;
