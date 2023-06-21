'use client';

import { Flex, Subtitle, Icon, Button, TextInput, DateRangePicker } from '@tremor/react';
import {
   PlusCircleIcon,
   InformationCircleIcon,
   MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import Filtros from './filtros';
import { Controller, useFormContext } from 'react-hook-form';
import { TypeFiltrosCobros } from '@app/components/list/cobrosModal';
import CobroAgregarDrawer from './cobroAgregarDrawer';

function CobroBar({ onSubmit }: { onSubmit: () => Promise<void> }) {
   const { register, control } = useFormContext<TypeFiltrosCobros>();

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
            justifyContent='end'
         >
            <CobroAgregarDrawer />
            <Filtros>
               <form onSubmit={onSubmit}>
                  <Flex className='flex gap-1 flex-wrap md:flex-nowrap mt-1'>
                     <TextInput
                        //disabled={loading === NetworkStatus.refetch}
                        {...register('descripcion')}
                        className='w-full'
                        placeholder='Buscar por nombre'
                        icon={MagnifyingGlassIcon}
                     />
                     <Controller
                        name='date'
                        control={control}
                        render={({ field }) => (
                           <DateRangePicker
                              //disabled={loading === NetworkStatus.refetch}
                              ref={field.ref}
                              className='mx-auto w-full'
                              defaultValue={field.value}
                              value={field.value}
                              onValueChange={field.onChange}
                              onBlur={field.onBlur}
                              selectPlaceholder='Seleccionar'
                              enableSelect={false}
                           />
                        )}
                     />
                     <Button type='submit' size='xs' className='mt-1'>
                        Buscar
                     </Button>
                  </Flex>
               </form>
            </Filtros>
         </Flex>
      </Flex>
   );
}

export default CobroBar;
