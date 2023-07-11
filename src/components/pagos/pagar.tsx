'use client';

import { Button, Card, Col, Flex, Grid, Text, TextInput } from '@tremor/react';
import BuscarUsuarioV2 from './buscarUsuarioV2';
import NumberInput from '../general/NumberInput';
import { FormProvider, useForm, Controller } from 'react-hook-form';
import { useBackgroundQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import {
    PagarDocument,
    SearchSelectPerfilDocument,
} from '@app/graphql/codegenGenerate/documents.generated';
import { useMutation } from '@apollo/client';
import { Suspense, useCallback, useState } from 'react';
import sweetAlert from 'sweetalert2'
import UploadFile from '../general/uploadFile';

import { useUploadThing } from '@app/libs/uploadthingHelpers';
import { classNames } from '@app/libs/className';

export type CrearPagoType = {
    referencia: string;
    monto: number;
    observacion: string;
    urlImg: string;
    file: FileList;
    perfilId: string;
};

export default function Pagar() {
    const [abrirBuscarUsuario, setAbrirBuscarUsuario] = useState<boolean>(false);
    const { startUpload, isUploading } = useUploadThing('imageUploader');
    const [mutation, { loading }] = useMutation(PagarDocument, {
        refetchQueries: ['misPagosRecibidos', 'misPagosRealizados']
    });

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
            perfilId: '',
            urlImg: '',
        },
    });

    const { control } = methods;

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

            sweetAlert.fire({ 
                title: 'Seguro que quiere enviar este pago', 
                text: 'text', 
                icon: 'warning', 
                showCancelButton: true, 
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const filesUrl = await startUpload(validFiles);
                    if (!filesUrl) return;
                    mutation({
                        variables: {
                            input: {
                                captureImg: filesUrl[0].fileUrl,
                                monto: data.monto,
                                perfilId: data.perfilId,
                                observacion: data.observacion,
                                referencia: data.referencia,
                            },
                        },
                        refetchQueries: [
                            'misPagosRealizados'
                        ]
                    });
                }
            })

        } catch (e) { 
            sweetAlert.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
              })
              
        }
    });

    return (
        <FormProvider {...methods}>
            <form onSubmit={onSubmit}>
                <Suspense fallback={<h1>cargando usuarios...</h1>}>
                    <Controller control={control} name='perfilId' render={({ field: { onChange } }) => (
                        <BuscarUsuarioV2
                            onSelect={(value) => onChange(value)}
                            queryRef={queryRef}
                            openState={abrirBuscarUsuario}
                            handleOpenState={handleAbrirBuscarUsuario}
                            onCancel={() => handleAbrirBuscarUsuario(false)}
                            onFetchMore={onChangePerfil} />
                    )} />

                </Suspense>
                <Card className={classNames(abrirBuscarUsuario ? 'hidden' : '', 'mt-2 mx-auto min-w-[18rem] max-w-md')}>
                    <Grid numItems={1} numItemsMd={2} className='gap-2 mt-2'>
                        <Col numColSpanMd={2}>
                            <UploadFile />
                        </Col>

                        <div>
                            <Text>Referencia</Text>
                            <TextInput
                                disabled={loading || isUploading}
                                placeholder='00002M'
                                {...methods.register('referencia')}
                            />
                        </div>
                        <div>
                            <Text>Observacion</Text>
                            <TextInput
                                disabled={loading || isUploading}
                                placeholder='00002M'
                                {...methods.register('observacion')}
                            />
                        </div>
                        <div>
                            <Text>Monto</Text>
                            <NumberInput
                                disabled={loading || isUploading}
                                placeholder='00002M'
                                type='number'
                                {...methods.register('monto')}
                            />
                        </div>
                    </Grid>
                    <Flex justifyContent='center' className='mt-2'>
                        <Button loading={loading || isUploading} type='submit'>
                            Enviar Pago
                        </Button>
                    </Flex>
                </Card>
            </form>
        </FormProvider>
    );
}
