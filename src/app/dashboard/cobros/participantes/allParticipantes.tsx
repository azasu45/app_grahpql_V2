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
import { UserGroupIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Pagination from '@app/components/pagination';

const gruposQuery = gql`
   query Participantes($skip: Int) {
      participantes(skip: $skip) {
         id
         cedula
         image
         nombre
         pagosCount
         grupo {
            nombre
            cuenta {
               nombre
            }
         }
      }
      participantesCount
   }
`;

function Result({ source, data }: { source: string; data: unknown }) {
   return (
      <Table>
         <TableHead>
            <TableRow>
               <TableHeaderCell>Nombre</TableHeaderCell>
               <TableHeaderCell>Cedula</TableHeaderCell>
               <TableHeaderCell>Pagos</TableHeaderCell>
               <TableHeaderCell>Grupo</TableHeaderCell>
               <TableHeaderCell>Cuenta</TableHeaderCell>
            </TableRow>
         </TableHead>
         <TableBody>
            {Array.isArray(data) &&
               data.map((participante) => {
                  return (
                     <TableRow key={participante.id}>
                        <TableCell className='flex flex-col items-center'>
                           <Image
                              src={participante.image}
                              width={32}
                              height={32}
                              alt={`icon-${participante.nombre}`}
                           />
                           <Text>{participante.nombre}</Text>
                        </TableCell>
                        <TableCell>
                           <Text>{participante.cedula}</Text>
                        </TableCell>
                        <TableCell>
                           <Badge
                              icon={UserGroupIcon}
                              color='orange'>
                              {participante.pagosCount}
                           </Badge>
                        </TableCell>
                        <TableCell>
                           <Text>{participante.grupo.nombre}</Text>
                        </TableCell>
                        <TableCell>
                           <Text>{participante.grupo.cuenta.nombre}</Text>
                        </TableCell>
                     </TableRow>
                  );
               })}
         </TableBody>
      </Table>
   );
}

export default function AllParticipantes() {
   const [page, setPage] = React.useState(0);
   const { data, loading, fetchMore } = useQuery(gruposQuery, {
      fetchPolicy: 'cache-first',
      variables: {
         skip: page * 10,
      },
   });

   const handleChangePage = async (
      event: React.MouseEvent<HTMLButtonElement> | null,
      newPage: number
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
         <Result
            source='useSuspenseQuery(userQuery)'
            data={data.participantes}
         />
         <Pagination
            count={data.participantesCount}
            page={page}
            handleChangePage={handleChangePage}
         />
      </Card>
   );
}
