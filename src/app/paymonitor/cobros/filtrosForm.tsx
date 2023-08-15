'use client';

import { Button, DateRangePicker, Flex, TextInput } from '@tremor/react';
import { Controller, useFormContext } from 'react-hook-form';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

function FiltrosForm() {
  const { register, control } = useFormContext();

  return (
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
            enableYearNavigation={true}
          />
        )}
      />
      <Button type='submit' size='xs' className='mt-1'>
        Buscar
      </Button>
    </Flex>
  );
}

export default FiltrosForm;
