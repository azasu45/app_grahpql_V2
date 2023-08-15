'use client';
import React from 'react';
import ModalCSP from '@app/components/general/modal';
import { useForm } from 'react-hook-form';
import { Button, Text, TextInput } from '@tremor/react';
import NumberInput from '../general/NumberInput';
import { gql, useMutation } from '@apollo/client';
import { AgregarCobroDocument } from '../../graphql/codegenGenerate/documents.generated';

type inputCobroAdd = {
  description: string;
  monto: number;
};

function CobrosAgregarModal({ callback }: { callback?: () => void }) {
  const [open, setOpen] = React.useState<boolean>(false);

  const { handleSubmit, register } = useForm<inputCobroAdd>();

  const [mutate, { data, loading }] = useMutation(AgregarCobroDocument);

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

  const handleOpen = (force?: boolean) => {
    if (callback) callback();
    setOpen(force ? force : !open);
  };

  return (
    <ModalCSP title='Agregar Cobro' open={open} handleOpen={handleOpen}>
      <form onSubmit={onSubmit} className='mx-auto'>
        <div className='mt-1'>
          <Text>Descripción</Text>
          <TextInput
            disabled={loading}
            {...register('description', { required: true })}
            placeholder='Cobro del mes'
          />
        </div>
        <div className='mt-1'>
          <Text>Monto</Text>
          <NumberInput
            disabled={loading}
            type='number'
            {...register('monto', {
              valueAsNumber: true,
              required: true,
              min: {
                value: 0,
                message: 'El valor ingresado por puede ser menor a 0',
              },
              max: {
                value: 100000,
                message: 'El valor ingresado por puede ser mayor a 100000',
              },
            })}
            placeholder='155555$'
          />
        </div>
        <Button className='mt-1' type='submit'>
          Guardar
        </Button>
      </form>
    </ModalCSP>
  );
}

export default CobrosAgregarModal;
