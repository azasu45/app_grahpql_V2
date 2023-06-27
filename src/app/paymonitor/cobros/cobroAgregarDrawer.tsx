'use client';

import { useState } from 'react';
import Drawer from '@app/components/general/drawer';
import { Button, TextInput } from '@tremor/react';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import { useForm } from 'react-hook-form';
import NumberInput from '@app/components/general/NumberInput';
import { AgregarCobroDocument } from '@app/graphql/codegenGenerate/documents.generated';
import { useMutation } from '@apollo/client';
interface InputAddCobro {
   description: string;
   monto: number;
}

function CobroAgregarDrawer() {
   const [open, setOpen] = useState<boolean>(false);

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<InputAddCobro>();

   const [mutate, { loading }] = useMutation(AgregarCobroDocument);

   const handleOpen = (force?: boolean) => {
      setOpen(force ?? !open);
   };

   const onSubmit = handleSubmit(async (data) => {
      await mutate({
         variables: {
            input: {
               descripcion: data.description,
               monto: data.monto,
            },
         },
         refetchQueries: ['Cobros'],
      });
   });

   return (
      <>
         <Button size='sm' iconPosition='right' icon={PlusCircleIcon} onClick={() => handleOpen()}>
            <span className='hidden md:block'>Agregar Nuevo Cobro</span>
         </Button>
         <Drawer open={open} handleOpen={handleOpen}>
            <form onSubmit={onSubmit}>
               <TextInput
                  disabled={loading}
                  className='mt-1'
                  placeholder='Ingrese una descripcion'
                  {...register('description', {
                     required: {
                        value: true,
                        message: 'La descripcion es requerida',
                     },
                  })}
                  errorMessage={errors.description?.message}
                  error={errors.description !== undefined}
               />

               <NumberInput
                  disabled={loading}
                  className='mt-1'
                  type='number'
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
