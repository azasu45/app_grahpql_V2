'use client';

import { NetworkStatus } from '@apollo/client';
import { useEffect, useState, Children, cloneElement } from 'react';
import Drawer from '@app/components/general/drawer';
import { Button, DateRangePicker, Flex, Icon, TextInput } from '@tremor/react';
import { FunnelIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { Controller, useFormContext } from 'react-hook-form';

/*
   Si se quiere que el filtro tome el control de la transición y animación cuando se abra el filtro pasar 
   por children el contender a aplicar la animación   
**/

function Filtros({ loading }: React.PropsWithChildren<{ loading?: NetworkStatus }>) {
   const [open, setOpen] = useState<boolean>(false);

   const handleOpenFilters = (force?: boolean) => {
      setOpen(force ?? !open);
   };

   const { register, control } = useFormContext();

   useEffect(() => {
      if (loading === NetworkStatus.ready) setOpen(false);
   }, [loading]);

   return (
      <>
         <Icon
            className='cursor-pointer'
            icon={FunnelIcon}
            onClick={() => handleOpenFilters(true)}
            size='md'
         />
         <Drawer open={open} handleOpen={handleOpenFilters} title='Filtrar Pagos'>
            <Flex className='gap-1 mt-4 h-full' flexDirection='col'>
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

               <div className='flex mt-auto space-x-1 mb-6 mr-auto'>
                  <Button type='submit' size='xs'>
                     Buscar
                  </Button>
                  <Button color='red' size='xs' onClick={() => handleOpenFilters(false)}>
                     Cancelar
                  </Button>
               </div>
            </Flex>
         </Drawer>
      </>
   );
}

export default Filtros;
