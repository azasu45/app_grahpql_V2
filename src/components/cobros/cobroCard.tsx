'use client';

import { useFragment } from '@apollo/experimental-nextjs-app-support/ssr';
import { TypedDocumentNode, gql } from '@apollo/client';
import { Bold, Card, Flex, Metric, Text, Title } from '@tremor/react';

const CobroCardFragment: TypedDocumentNode<{
   id: string;
   descripcion: string;
   monto: number;
   fecha: Date;
   pagosCount: number;
}> = gql`
   fragment CobroCardFragment on Cobro {
      descripcion
      fecha
      monto
      pagosCount
   }
`;

export function CobroCard({ id }: { id: string }) {
   const { complete, data } = useFragment({
      fragment: CobroCardFragment,
      from: `Cobro:${id}`,
   });

   return (
      <Card className='py-1 px-2'>
         <Title>{data?.descripcion}</Title>
         <Flex className='gap-4 mt-2' alignItems='start'>
            <Metric className='mt-2 basis-0 whitespace-nowrap'>{data?.monto} $</Metric>
            <div className='grow'>
               <Bold>Fecha</Bold>
               <Text>{data?.fecha?.toLocaleString()}</Text>
            </div>
            <div className='basis-0'>
               <Bold>Pagos</Bold>
               <Text>{data?.pagosCount}</Text>
            </div>
         </Flex>
      </Card>
   );
}

export default CobroCard;
