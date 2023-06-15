'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import {
   Flex,
   TextInput,
   DateRangePicker,
   DateRangePickerValue,
   Button,
} from '@tremor/react';
import { useFormContext } from 'react-hook-form';
import React from 'react';

function Filtros() {
   const { register } = useFormContext();

   const [value, setValue] = React.useState<DateRangePickerValue>({
      from: new Date(2023, 1, 1),
      to: new Date(),
   });

   return (
      <>
         <Flex className='mt-1 gap-1 flex-wrap md:flex-nowrap'>
            <TextInput
               {...register('descripcion')}
               className='w-full'
               placeholder='Buscar por nombre'
               icon={MagnifyingGlassIcon}
            />
            <DateRangePicker className='mx-auto w-full' />
            <Button
               type='submit'
               size='xs'>
               Buscar
            </Button>
         </Flex>
      </>
   );
}

export default Filtros;
