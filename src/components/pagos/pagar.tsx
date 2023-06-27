'use client';

import { Button, Card, Flex, Grid, Text, TextInput, Title } from '@tremor/react';
import NumberInput from '../general/NumberInput';
import { FormProvider, useForm } from 'react-hook-form';
import { useBackgroundQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import {
   PagarDocument,
   SearchSelectPerfilDocument,
} from '@app/graphql/codegenGenerate/documents.generated';
import BuscarUsuarioV2 from './buscarUsuarioV2';
import { useMutation } from '@apollo/client';
import { Suspense, useEffect, useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export type CrearPagoType = {
   referencia: string;
   monto: number;
   observacion: string;
   urlImg: string;
   perfil: {
      id: string;
      nombre: string;
   };
};

export default function Pagar() {
   const [abrirBuscarUsuario, setAbrirBuscarUsuario] = useState<boolean>(false);
   const [mutation] = useMutation(PagarDocument);

   const handleAbrirBuscarUsuario = (force?: boolean) => {
      setAbrirBuscarUsuario(force ?? !abrirBuscarUsuario);
   };

   const methods = useForm<CrearPagoType>({
      defaultValues: {
         monto: 0,
         observacion: '',
         referencia: '',
         perfil: {
            id: '',
            nombre: '',
         },
         urlImg: '',
      },
   });

   const { watch } = methods;

   const [queryRef, { refetch }] = useBackgroundQuery(SearchSelectPerfilDocument, {
      canonizeResults: true,
      variables: {
         nombre: '',
      },
      fetchPolicy: 'cache-first',
   });

   const onChangePerfil = async (value: string) => {
      await refetch({
         nombre: value,
      });
   };

   const {
      watchQueryOptions: {},
   } = queryRef;

   const onSubmit = methods.handleSubmit((data) => {
      mutation({
         variables: {
            input: {
               captureImg: '/images/capture-1.jpg',
               monto: data.monto,
               perfilId: data.perfil.id,
               observacion: data.observacion,
               referencia: data.referencia,
            },
         },
      });
   });

   useEffect(() => {
      handleAbrirBuscarUsuario(false);
   }, [watch('perfil.nombre')]);

   return (
      <FormProvider {...methods}>
         <form onSubmit={onSubmit}>
            {!abrirBuscarUsuario && (
               <Card className='max-w-md mx-auto'>
                  <Flex>
                     <Title>Pagar a {watch('perfil.nombre')}</Title>
                     <Button
                        size='xs'
                        icon={MagnifyingGlassIcon}
                        type='button'
                        onClick={() => handleAbrirBuscarUsuario()}
                     >
                        Buscar
                     </Button>
                  </Flex>
               </Card>
            )}

            {abrirBuscarUsuario && (
               <Card className='mt-2 max-w-md max-auto mx-auto'>
                  <Suspense fallback={<h1>cargando usuarios...</h1>}>
                     <BuscarUsuarioV2 onChangePerfil={onChangePerfil} queryRef={queryRef} />
                  </Suspense>

                  <Flex justifyContent='end' className='mt-2'>
                     <Button size='xs' onClick={() => handleAbrirBuscarUsuario()}>
                        Cancelar
                     </Button>
                  </Flex>
               </Card>
            )}

            {!abrirBuscarUsuario && (
               <Card className='mt-2 max-w-md mx-auto'>
                  <Grid numItems={1} numItemsMd={2} className='gap-2 mt-2'>
                     <div>
                        <Text>Referencia</Text>
                        <TextInput placeholder='00002M' {...methods.register('referencia')} />
                     </div>
                     <div>
                        <Text>Observacion</Text>
                        <TextInput placeholder='00002M' {...methods.register('observacion')} />
                     </div>
                     <div>
                        <Text>Monto</Text>
                        <NumberInput
                           placeholder='00002M'
                           type='number'
                           {...methods.register('monto')}
                        />
                     </div>
                  </Grid>
                  <Flex justifyContent='center' className='mt-2'>
                     <Button type='submit'>Enviar Pago</Button>
                  </Flex>
               </Card>
            )}
         </form>
      </FormProvider>
   );
}
