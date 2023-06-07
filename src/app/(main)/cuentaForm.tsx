'use client';

import React from 'react';
import { TextInput, Text, Button } from '@tremor/react';
import { useForm } from 'react-hook-form';

type Input = {
   nombre: string;
};

const CuentaForm = () => {
   const { register, handleSubmit } = useForm<Input>();

   const onSubmit = handleSubmit(
      async (data) =>
         await fetch('/api/graphql', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({
               query: `
                    mutation crearCuenta($input:crearCuenta!){
                        crearCuenta(input:$input){
                            id
                            nombre
                        }
                    }
                `,
               variables: {
                  input: {
                     nombre: data.nombre,
                  },
               },
            }),
         })
   );

   return (
      <form onSubmit={onSubmit}>
         <div>
            <Text>Nombre de la cuenta</Text>
            <TextInput
               type='text'
               {...register('nombre')}
            />
         </div>
         <Button type='submit'>Submit</Button>
      </form>
   );
};

export default CuentaForm;
