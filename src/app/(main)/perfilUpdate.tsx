'use client';
import React from 'react';
import { Button, Card, Text, TextInput } from '@tremor/react';
import { useMutation, gql } from '@apollo/client';
import { useForm } from 'react-hook-form';

const updatePerfilMutation = gql`
   mutation CrearOActualizarPerfil($input: crearOActualizarPerfil!) {
      crearOActualizarPerfil(input: $input) {
         cedula
         id
         subName
         userId
      }
   }
`;

type Input = {
   nombre: string;
   cedula: string;
};

function PerfilUpdate() {
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<Input>();

   const [mutation, { data, loading, error }] = useMutation(
      updatePerfilMutation,
      {
         onCompleted: (data) => {
            console.log(data);
         },
      }
   );

   const onSubmit = handleSubmit((data) => {
      mutation({
         variables: {
            input: data,
         },
      });
      console.log(data);
   });

   return (
      <Card className='m-auto'>
         <form
            onSubmit={onSubmit}
            className='flex flex-col gap-2'>
            <div className='w-100'>
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
            <div className='w-100'>
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
               size='sm'
               type='submit'
               className='mx-auto'>
               Actualizar Perfil
            </Button>
         </form>
      </Card>
   );
}
export default PerfilUpdate;
