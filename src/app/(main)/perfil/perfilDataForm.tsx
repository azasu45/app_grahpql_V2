'use client';

import { Button, Card, Grid, Text, TextInput } from '@tremor/react';
import { useMutation, gql } from '@apollo/client';
import { useForm } from 'react-hook-form';
import {
  CrearOActualizarPerfilDocument,
  PerfilDocument,
} from '@app/graphql/codegenGenerate/documents.generated';
import { useCallback } from 'react';
import Sweetalert from 'sweetalert2';

type Input = {
  nombre: string;
  cedula: string;
};

export default function PerfilDataForm({ defaultValues }: { defaultValues: Input }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Input>({
    defaultValues,
  });

  const [mutation, { loading }] = useMutation(CrearOActualizarPerfilDocument, {
    refetchQueries: [PerfilDocument],
    onCompleted: (data) => {
      if (data.crearOActualizarPerfil?.cedula) {
        Sweetalert.fire(
          'Good job!',
          'You clicked the button! ' + data.crearOActualizarPerfil.cedula,
          'success'
        );
      }
    },
    onError: (error) => {
      Sweetalert.fire('Error', 'Message ' + error.message, 'error');
    },
  });

  const mutationCallback = useCallback(
    async (data: Input) => {
      await mutation({
        variables: {
          input: data,
        },
      });
    },
    [mutation]
  );

  const onSubmit = handleSubmit((data) => {
    mutationCallback(data);
  });

  return (
    <Card>
      <form onSubmit={onSubmit}>
        <Grid numItems={1} numItemsMd={2} className='gap-2'>
          <div>
            <Text>Nombre</Text>
            <TextInput
              disabled={loading}
              error={!!errors.nombre}
              errorMessage={errors.nombre?.message}
              placeholder='Alana Chole'
              {...register('nombre', {
                required: {
                  message: 'Este campo es requerido',
                  value: true,
                },
                maxLength: {
                  message: 'Máximo de caracteres 50',
                  value: 50,
                },
              })}
            />
          </div>
          <div>
            <Text>Cedula</Text>
            <TextInput
              disabled={loading}
              error={!!errors.nombre}
              errorMessage={errors.nombre?.message}
              placeholder='111111111'
              {...register('cedula', {
                required: {
                  message: 'Este campo es requerido',
                  value: true,
                },
                maxLength: {
                  message: 'Máximo de caracteres 20',
                  value: 20,
                },
              })}
            />
          </div>
          <Button
            loadingText='Actualizando'
            loading={loading}
            disabled={loading}
            size='xs'
            type='submit'
            className='mr-auto'>
            Actualizar Perfil
          </Button>
        </Grid>
      </form>
    </Card>
  );
}
