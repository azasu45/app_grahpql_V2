'use client';

export const dynamic = 'force-dynamic';

import { gql } from '@apollo/client';
import { useQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import {
   Badge,
   Card,
   Grid,
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeaderCell,
   TableRow,
   Text,
} from '@tremor/react';
import Image from 'next/image';
import Pagination from '@app/components/pagination';
import { useState } from 'react';

const gruposQuery = gql`
   query Pagos($skip: Int!) {
      pagos(skip: $skip) {
         id
         referencia
         monto
         fecha
         captureImg
         cobro {
            id
            descripcion
         }
      }
      pagosCount
   }
`;

function Result({ source, data }: { source: string; data: unknown }) {
   return (
      <Grid numItems={1} numItemsSm={2} numItemsMd={3} numItemsLg={4} className='gap-2'>
         <Card>
            <div className='h-44' />
         </Card>
      </Grid>
   );
}

export default function AllPagos() {
   const [page, setPage] = useState(0);
   const { data, loading, fetchMore } = useQuery(gruposQuery, {
      fetchPolicy: 'cache-first',
      variables: {
         skip: page * 10,
      },
   });

   const handleChangePage = async (
      event: React.MouseEvent<HTMLButtonElement> | null,
      newPage: number,
   ) => {
      setPage(newPage);
      await fetchMore({
         variables: {
            skip: page * 10,
         },
      });
   };
   if (loading) return <div>Cargando</div>;

   return (
      <Card className='mt-6'>
         <Result source='useSuspenseQuery(userQuery)' data={data.pagos} />
         <Pagination count={data.pagosCount} page={page} handleChangePage={handleChangePage} />
      </Card>
   );
}
