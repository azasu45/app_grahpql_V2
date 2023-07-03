'use client';

import '@uploadthing/react/styles.css';

import { Button, Card, Col, Flex, Grid, Text, TextInput, Title } from '@tremor/react';
import NumberInput from '../general/NumberInput';
import { FormProvider, useForm } from 'react-hook-form';
import { useBackgroundQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import {
   PagarDocument,
   SearchSelectPerfilDocument,
} from '@app/graphql/codegenGenerate/documents.generated';
import BuscarUsuarioV2 from './buscarUsuarioV2';
import { gql, useMutation } from '@apollo/client';
import { Suspense, useCallback, useEffect, useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import UploadFile from '../general/uploadFile';
import { uploadFileAction } from '@app/app/actions/uploadFile';
import { useUploadThing } from '@app/libs/uploadthingHelpers';

export type CrearPagoType = {
   referencia: string;
   monto: number;
   observacion: string;
   urlImg: string;
   file: FileList;
   perfil: {
      id: string;
      nombre: string;
   };
};

export default function Pagar() {
   const { startUpload } = useUploadThing('imageUploader');
   const [abrirBuscarUsuario, setAbrirBuscarUsuario] = useState<boolean>(false);
   const [mutation, { loading }] = useMutation(PagarDocument);

   const handleAbrirBuscarUsuario = useCallback(
      (force?: boolean) => {
         setAbrirBuscarUsuario(force ?? !abrirBuscarUsuario);
      },
      [abrirBuscarUsuario],
   );

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

   const onSubmit = methods.handleSubmit(async (data) => {
      const validFiles: File[] = [];
      for (let i = 0; i < data.file.length; i++) {
         const file = data.file[i];
         if (file) {
            if (!file.type.startsWith('image')) {
               alert(`File with idx: ${i} is invalid`);
               continue;
            }
            validFiles.push(file);
         }
      }
      if (!validFiles.length) {
         alert('No valid files were chosen');
         return;
      }
      try {
         const filesUrl = await startUpload(validFiles);
         if (!filesUrl) return;
         mutation({
            variables: {
               input: {
                  captureImg: filesUrl[0].fileUrl,
                  monto: data.monto,
                  perfilId: data.perfil.id,
                  observacion: data.observacion,
                  referencia: data.referencia,
               },
            },
         });
      } catch (e) {}
   });

   useEffect(() => {
      if (watch('perfil.nombre') !== '') handleAbrirBuscarUsuario(false);
   }, [handleAbrirBuscarUsuario, watch('perfil.nombre')]);

   return (
      <FormProvider {...methods}>
         <form onSubmit={onSubmit} action={uploadFileAction}>
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
                     <Col numColSpanMd={2}>
                        <UploadFile />
                     </Col>

                     <div>
                        <Text>Referencia</Text>
                        <TextInput
                           disabled={loading}
                           placeholder='00002M'
                           {...methods.register('referencia')}
                        />
                     </div>
                     <div>
                        <Text>Observacion</Text>
                        <TextInput
                           disabled={loading}
                           placeholder='00002M'
                           {...methods.register('observacion')}
                        />
                     </div>
                     <div>
                        <Text>Monto</Text>
                        <NumberInput
                           disabled={loading}
                           placeholder='00002M'
                           type='number'
                           {...methods.register('monto')}
                        />
                     </div>
                  </Grid>
                  <Flex justifyContent='center' className='mt-2'>
                     <Button loading={loading} type='submit'>
                        Enviar Pago
                     </Button>
                  </Flex>
               </Card>
            )}
         </form>
      </FormProvider>
   );
}
