'use client';

import { Button, Card, Grid, Subtitle, Text, TextInput } from '@tremor/react';
import NumberInput from '../general/NumberInput';
import { FormProvider, useForm } from 'react-hook-form';
import { useBackgroundQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import {
   PagarDocument,
   SearchSelectPerfilDocument,
} from '@app/graphql/codegenGenerate/documents.generated';
import BuscarUsuarioV2 from './buscarUsuarioV2';
import { useMutation } from '@apollo/client';

export type CrearPagoType = {
   referencia: string;
   monto: number;
   observacion: string;
   urlImg: string;
   perfilId: string;
};

export default function Pagar() {
   const [mutation, { loading }] = useMutation(PagarDocument);

   const methods = useForm<CrearPagoType>({
      defaultValues: {
         monto: 0,
         observacion: '',
         referencia: '',
         perfilId: '',
         urlImg: '',
      },
   });

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
               perfilId: data.perfilId,
               observacion: data.observacion,
               referencia: data.referencia,
            },
         },
      });
   });

   return (
      <FormProvider {...methods}>
         <form onSubmit={onSubmit}>
            <Card className='max-w-md mx-auto'>
               <Subtitle>Paso 1: Buscar a quien se le va hacer el pago; Image Mockeado</Subtitle>
            </Card>
            <Card className='mt-2 max-w-md max-auto mx-auto'>
               <BuscarUsuarioV2 onChangePerfil={onChangePerfil} queryRef={queryRef} />
            </Card>
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
            </Card>
            <Button className='mt-2' type='submit'>
               Enviar Pago
            </Button>
         </form>
      </FormProvider>
   );
}
