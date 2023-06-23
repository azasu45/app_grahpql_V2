'use client';

import { Prisma } from '@prisma/client';
import { useState } from 'react';
import Drawer from '@app/components/drawer';
import { Button, TextInput } from '@tremor/react';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import { useForm } from 'react-hook-form';
import NumberInput from '@app/components/NumberInput';

interface InputAddCobro {
   descripcion: string;
   monto: Prisma.Decimal;
}

function CobroAgregarDrawer() {
   const [open, setOpen] = useState<boolean>(false);

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<InputAddCobro>();

   const handleOpen = (force?: boolean) => {
      setOpen(force ?? !open);
   };

   const onSubmit = handleSubmit((data) => {
      console.log(data);
   });

   return (
      <>
         <Button size='sm' iconPosition='right' icon={PlusCircleIcon} onClick={() => handleOpen()}>
            <span className='hidden md:block'>Agregar Nuevo Cobro</span>
         </Button>
         <Drawer open={open} handleOpen={handleOpen}>
            <form onSubmit={onSubmit}>
               <TextInput
                  className='mt-1'
                  placeholder='Ingrese una descripcion'
                  {...register('descripcion', {
                     required: {
                        value: true,
                        message: 'La descripcion es requerida',
                     },
                  })}
                  errorMessage={errors.descripcion?.message}
                  error={errors.descripcion !== undefined}
               />

               <NumberInput
                  className='mt-1'
                  type='text'
                  placeholder='Ingrese una descripcion'
                  {...register('monto', {
                     valueAsNumber: true,
                     required: {
                        value: true,
                        message: 'El monto es requerido',
                     },
                     min: 0,
                     max: 1000,
                  })}
                  errorMessage={errors.monto?.message}
                  error={errors.monto !== undefined}
               />

               <Button className='mt-1' type='submit'>
                  Guardar
               </Button>
            </form>
         </Drawer>
      </>
   );
}

export default CobroAgregarDrawer;
