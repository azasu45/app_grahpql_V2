'use client';

import { Button, Card, Grid, Text, TextInput } from '@tremor/react';
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

export default function PerfilDataForm() {
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<Input>();

   const [mutation, { data, loading, error }] = useMutation(updatePerfilMutation, {
      onCompleted: (data) => {
         console.log(data);
      },
   });

   const onSubmit = handleSubmit((data) => {
      mutation({
         variables: {
            input: data,
         },
      });
      console.log(data);
   });

   return (
      <Card>
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
               className='mr-auto'
            >
               Actualizar Perfil
            </Button>
         </Grid>
      </Card>
   );
}
