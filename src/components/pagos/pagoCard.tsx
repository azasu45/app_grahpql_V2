'use client';

import { useFragment } from '@apollo/experimental-nextjs-app-support/ssr';
import { Bold, Card, Flex, Metric, Text, Title, Badge, Callout } from '@tremor/react';
import { PagoCardFragmentFragmentDoc } from '@app/graphql/codegenGenerate/documents.generated';
import { CircleStackIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';

export function PagoCard({ id }: { id: string }) {
   const { data } = useFragment({
      fragment: PagoCardFragmentFragmentDoc,
      from: `Pago:${id}`,
   });

   return (
      <Card className='py-1 px-1'>
         <Flex className='gap-2' alignItems='center'>
            <div className='overflow-hidden w-20 h-24'>
               <Image
                  className='object-cover h-full w-full rounded-tremor-small shadow-sm'
                  src={data?.captureImg ?? '/images/capture-1.jpg'}
                  alt={`captureImage-${id}`}
                  width={100}
                  height={200}
               />
            </div>
            <div className='w-full min-h-[94px]'>
               <Flex>
                  <Title>
                     {data?.referencia}
                     <Badge color={data?.estado === 1 ? 'green' : 'red'} icon={CircleStackIcon}>
                        <Text>{data?.estado === 1 ? 'procesado' : 'en espera'}</Text>
                     </Badge>
                  </Title>
                  <Text>{data?.fecha}</Text>
               </Flex>

               <Text>{data?.monto} $</Text>
               <Text>{data?.refAdmin}</Text>
               <Callout title='Observación'>{data?.observacion}</Callout>
            </div>
         </Flex>
      </Card>
   );
}
