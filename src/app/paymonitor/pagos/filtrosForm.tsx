'use client';
import { Button, DateRangePicker, Flex, TextInput } from '@tremor/react';
import { Controller, useFormContext } from 'react-hook-form';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

function FiltrosForm() {
  const { register, control } = useFormContext();

  return (
    <Flex className='gap-1 mt-4 h-full' flexDirection='col'>
      <TextInput
        {...register('referencia')}
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
        {/* <Button color='red' size='xs' onClick={() => handleOpenFilters(false)}>
          Cancelar
        </Button> */}
      </div>
    </Flex>
  );
}

export default FiltrosForm;
