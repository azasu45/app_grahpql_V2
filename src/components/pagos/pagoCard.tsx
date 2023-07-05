'use client';

import { useFragment } from '@apollo/experimental-nextjs-app-support/ssr';
import { TypedDocumentNode, gql } from '@apollo/client';
import { Bold, Card, Flex, Metric, Text, Title } from '@tremor/react';
import { PagoCardFragmentFragmentDoc } from '@app/graphql/codegenGenerate/documents.generated';
import Image from 'next/image';

export function PagoCard({ id }: { id: string }) {
   const { complete, data } = useFragment({
      fragment: PagoCardFragmentFragmentDoc,
      from: `Pago:${id}`,
   });

   return (
      <Card className='py-1 px-2'>
         <Title>{data?.referencia}</Title>
         <Flex className='gap-4 mt-2' alignItems='start'>
            <div className='overflow-hidden w-24 h-28'>
               <Image
                  className='object-contain'
                  src={data.captureImg ?? '/images/capture-1.jpg'}
                  height={800}
                  width={600}
                  alt='captureImage'
               />
            </div>
            <div className='grow'>
               <Metric className='mt-2 basis-0 whitespace-nowrap'>{data?.monto} $</Metric>
               <Bold>Fecha</Bold>
               <Text>{data?.fecha?.toLocaleString()}</Text>
            </div>
            <div className='basis-0'>
               <Bold>Pagos</Bold>
               <Text>{data?.observacion}</Text>
            </div>
         </Flex>
      </Card>
   );
}
