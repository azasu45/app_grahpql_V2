'use client';

export const dynamic = 'force-dynamic';

import React from 'react';
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import {
   Badge,
   Card,
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeaderCell,
   TableRow,
   Text,
} from '@tremor/react';
import {
   BuildingLibraryIcon,
   UserGroupIcon,
} from '@heroicons/react/24/outline';
import Pagination from '@app/components/pagination';

const cuentasQuery = gql`
   query Cuentas($skip: Int) {
      cuentas(skip: $skip) {
         id
         nombre
         gruposCount
         cobrosCount
      }
      cuentasCount
   }
`;

export default function AllCuentas() {
   return <SuspenseQueryCuentas />;
}

function Result({ source, data }: { source: string; data: unknown }) {
   return (
      <Table>
         <TableHead>
            <TableRow>
               <TableHeaderCell>Nombre</TableHeaderCell>
               <TableHeaderCell>Grupos</TableHeaderCell>
               <TableHeaderCell>Cobros</TableHeaderCell>
            </TableRow>
         </TableHead>
         <TableBody>
            {Array.isArray(data) &&
               data.map((cuenta) => {
                  return (
                     <TableRow key={cuenta.id}>
                        <TableCell>
                           <Text>{cuenta.nombre}</Text>
                        </TableCell>
                        <TableCell>
                           <Badge
                              icon={UserGroupIcon}
                              color='orange'>
                              {cuenta.gruposCount}
                           </Badge>
                        </TableCell>
                        <TableCell>
                           <Badge
                              icon={BuildingLibraryIcon}
                              color='sky'>
                              {cuenta.cobrosCount}
                           </Badge>
                        </TableCell>
                     </TableRow>
                  );
               })}
         </TableBody>
      </Table>
   );
}

function SuspenseQueryCuentas() {
   const [page, setPage] = React.useState(0);
   const result = useQuery(cuentasQuery, {
      fetchPolicy: 'cache-first',
      variables: {
         skip: page * 10,
      },
   });

   const handleChangePage = (
      event: React.MouseEvent<HTMLButtonElement> | null,
      newPage: number
   ) => {
      setPage(newPage);
      result.refetch();
   };

   if (result.loading) return <div>Cargando</div>;

   return (
      <Card className='mt-6'>
         <Result
            source='useSuspenseQuery(userQuery)'
            data={result.data.cuentas}
         />
         <Pagination
            count={result.data.cuentasCount}
            page={page}
            handleChangePage={handleChangePage}
         />
      </Card>
   );
}
