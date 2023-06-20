'use client';

import React from 'react';
import { FunnelIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { Flex, TextInput, DateRangePicker, Button, Icon } from '@tremor/react';
import { useFormContext, Controller } from 'react-hook-form';
import { TypeFiltrosCobros } from './list/cobrosModal';
import { Transition } from '@headlessui/react';

/*
   Si se quiere que el filtro tome el control de la transición y animación cuando se abra el filtro pasar 
   por children el contender a aplicar la animación   
**/

function Filtros() {
   const [open, setOpen] = React.useState<boolean>(false);
   const { register, control } = useFormContext<TypeFiltrosCobros>();

   return (
      <>
         <Icon onClick={() => setOpen(!open)} icon={FunnelIcon} className='ml-auto block h-8 w-8' />
         <Transition show={open} as={React.Fragment}>
            <Transition.Child
               enter='transition-opacity duration-75'
               enterFrom='opacity-0'
               enterTo='opacity-100'
               leave='transition-opacity duration-150'
               leaveFrom='opacity-100'
               leaveTo='opacity-0'
            >
               <Flex className='flex gap-1 flex-wrap md:flex-nowrap mt-1'>
                  <TextInput
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

                  <Button type='submit' size='xs'>
                     Buscar
                  </Button>
               </Flex>
            </Transition.Child>
         </Transition>
      </>
   );
}

export default Filtros;
