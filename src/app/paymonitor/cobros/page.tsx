'use client';

import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useQuery, gql } from '@apollo/client';
import Pagination from '@app/components/pagination';
import {
   Bold,
   Card,
   type DateRangePickerValue,
   Flex,
   Metric,
   Text,
   Title,
} from '@tremor/react';
import Filtros from './filtros';

const cobrosQuery = gql`
   query Cobros($skip: Int, $filtros: InputFiltrosCobros) {
      cobros(skip: $skip, filtros: $filtros) {
         id
         monto
         descripcion
         fecha
         pagosCount
      }
      cobrosCount
   }
`;

export type TypeFiltrosCobros = {
   descripcion: string;
   date: DateRangePickerValue;
};

const Page = () => {
   const [page, setPage] = React.useState(0);

   const { handleSubmit } = useFormContext<TypeFiltrosCobros>();

   const { data, loading, fetchMore, refetch } = useQuery(cobrosQuery, {
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
      refetch();
   };

   const onSubmit = handleSubmit(async (data) => {
      refetch({
         filtros: {
            descripcion: data.descripcion,
            fechaDesde: data.date.from ?? null,
            fechaHasta: data.date.to ?? null,
         },
      });
   });

   return (
      <>
         <Flex>
            <form onSubmit={onSubmit}>
               <Filtros />
            </form>
         </Flex>

         {loading ? (
            <div>Cargando Cobros</div>
         ) : (
            <>
               <div className='grow mt-2'>
                  <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2 '>
                     {data.cobros.map(
                        (cobro: {
                           id: string;
                           descripcion: string;
                           monto: number;
                           fecha: Date;
                           pagosCount: number;
                        }) => (
                           <Card
                              key={cobro.id}
                              className='py-1 px-2'>
                              <Title>{cobro.descripcion}</Title>
                              <Flex
                                 className='gap-4 mt-2'
                                 alignItems='start'>
                                 <Metric className='mt-2 basis-0 whitespace-nowrap'>
                                    {cobro.monto} $
                                 </Metric>
                                 <div className='grow'>
                                    <Bold>Fecha</Bold>
                                    <Text>{cobro.fecha.toLocaleString()}</Text>
                                 </div>
                                 <div className='basis-0'>
                                    <Bold>Pagos</Bold>
                                    <Text>{cobro.pagosCount}</Text>
                                 </div>
                              </Flex>
                           </Card>
                        )
                     )}
                  </div>
               </div>
               <Pagination
                  count={data.cobrosCount}
                  page={page}
                  handleChangePage={handleChangePage}
               />
            </>
         )}
      </>
   );
};

export default Page;
