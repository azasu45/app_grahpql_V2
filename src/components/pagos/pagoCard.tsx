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
            <div className='overflow-hidden'>
               <Image
                  src={data.captureImg ?? '/images/capture-1.jpg'}
                  height={100}
                  width={100}
                  alt='captureImage'
               />
               <Metric className='mt-2 basis-0 whitespace-nowrap'>{data?.monto} $</Metric>
            </div>
            <div className='grow'>
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
