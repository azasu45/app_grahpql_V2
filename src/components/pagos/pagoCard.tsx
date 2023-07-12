'use client';

import Image from 'next/image';
import { useFragment } from '@apollo/experimental-nextjs-app-support/ssr';
import { PagoCardFragmentFragmentDoc } from '@app/graphql/codegenGenerate/documents.generated';
import { Badge, Card, Flex, Subtitle, Text, Title } from '@tremor/react';
import { classNames } from '@app/libs/className';
import { useState } from 'react';

export function PagoCard({ id }: { id: string }) {
   const [active, setActive] = useState<boolean>(false);

   const { data, complete } = useFragment({
      fragment: PagoCardFragmentFragmentDoc,
      from: `Pago:${id}`,
   });

   function getState(state?: number): string {
      if (!state) return 'Error';
      if (state === 1) return 'Pendiente';
      return '';
   }

   return (
      <Card className="before:content-[' '] before:width-[20px] before:height-[20px] relative flex min-h-[200px] flex-col justify-between rounded-tl-3xl before:absolute before:z-[10] before:bg-gray-300 lg:w-full">
         <div className='absolute left-0 top-0 h-[4rem] w-[4rem] -translate-x-2 -translate-y-2 rounded-full border-[5px] border-gray-50'>
            <div
               className={classNames(
                  !complete ? 'animate-pulse' : '',
                  'absolute inset-0 overflow-hidden rounded-[50%] bg-slate-600',
               )}
            >
               {complete && (
                  <Image
                     className='absolute h-full w-full object-cover'
                     width={800}
                     height={600}
                     alt={`Pago-Image-${data.referencia}`}
                     src={data?.captureImg ?? '/images/capture-1.jpg'}
                  />
               )}
            </div>
         </div>
         <Flex
            className='absolute inset-0 gap-1 p-2'
            flexDirection='col'
            justifyContent='between'
            alignItems='start'
         >
            <div className='min-h-[75px] w-full pl-20'>
               <Title>{data.referencia} </Title>
               {data.refAdmin && (
                  <Badge className='w-full text-ellipsis text-xs'>
                     {data.refAdmin ?? 'Agregar referencia personal'}
                  </Badge>
               )}
               <Subtitle className='text-sm'>
                  {data.perfilSuscrito?.comercio ?? data.perfilSuscrito?.nombre}{' '}
               </Subtitle>
               <Subtitle className='text-sm'>
                  {data?.cobro ? (
                     <>
                        - {data.cobro.descripcion} - {data.cobro.monto}
                     </>
                  ) : (
                     <></>
                  )}
               </Subtitle>
            </div>

            <div className='h-full w-full text-ellipsis'>
               <Text>{data.observacion}</Text>
            </div>
            <ul className='relative grid w-full grid-cols-3 justify-evenly [&>li:not(:last-child)]:border-r [&>li:not(:last-child)]:border-tremor-content-emphasis [&>li]:px-1'>
               <li>
                  <Text className='flex flex-col text-center'>
                     Fecha
                     <span>{data.fecha}</span>
                  </Text>
               </li>
               <li>
                  <Text className='flex flex-col text-center'>
                     Monto
                     <span>{data.monto}</span>
                  </Text>
               </li>
               <li>
                  <Text className='flex flex-col text-center'>
                     Estado
                     <span>{data.estado}</span>
                  </Text>
               </li>
            </ul>
         </Flex>
      </Card>
   );
}
