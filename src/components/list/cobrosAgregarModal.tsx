'use client';
import React from 'react';
import ModalCSP from '@app/components/modal';
import { useForm } from 'react-hook-form';
import { Button, Text, TextInput } from '@tremor/react';

type inputCobroAdd = {
   description: string;
   monto: string;
};

function CobrosAgregarModal({ callback }: { callback?: () => void }) {
   const [open, setOpen] = React.useState<boolean>(false);

   const { handleSubmit, register } = useForm<inputCobroAdd>();

   const onSubmit = handleSubmit((data) => {});

   const handleOpen = (force?: boolean) => {
      if (callback) callback();
      setOpen(force ? force : !open);
   };

   return (
      <ModalCSP
         title='Agregar Cobro'
         open={open}
         handleOpen={handleOpen}>
         <form
            onSubmit={onSubmit}
            className='mx-auto'>
            <div className='mt-1'>
               <Text>Descripción</Text>
               <TextInput
                  {...register('description', { required: true })}
                  placeholder='Cobro del mes'
               />
            </div>
            <div className='mt-1'>
               <Text>Monto</Text>
               <TextInput
                  type='number'
                  {...register('monto', {
                     valueAsNumber: true,
                     required: true,
                     min: {
                        value: 0,
                        message: 'El valor ingresado por puede ser menor que 0',
                     },
                  })}
                  placeholder='155555$'
               />
            </div>
            <Button
               className='mt-1'
               type='submit'>
               Guardar
            </Button>
         </form>
      </ModalCSP>
   );
}

export default CobrosAgregarModal;
