'use client';

import React from 'react';
import ModalCSP from '@app/components/modal';
import Filtros from '../filtros';
import { FormProvider, useForm } from 'react-hook-form';
import {
   Bold,
   Button,
   Card,
   DateRangePickerValue,
   Flex,
   Metric,
   Text,
   Title,
} from '@tremor/react';
import { useQuery, gql } from '@apollo/client';
import Pagination from '@app/components/pagination';
import CobrosAgregarModal from './cobrosAgregarModal';

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

function CobrosModal() {
   const [open, setOpen] = React.useState<boolean>(false);
   const handleOpen = (force?: boolean) => {
      fetchMore({
         variables: {
            skip: page * 10,
         },
      });
      setOpen(force ? force : !open);
   };

   const [page, setPage] = React.useState(0);

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

   const methods = useForm<TypeFiltrosCobros>({
      defaultValues: {
         descripcion: '',
      },
   });

   const onSubmit = methods.handleSubmit((data) => {
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
         <ModalCSP
            title='Cobros'
            open={open}
            handleOpen={handleOpen}>
            <FormProvider {...methods}>
               <form
                  onSubmit={onSubmit}
                  className='min-h-[480px] flex flex-col'>
                  <div className='flex gap-2'>
                     <CobrosAgregarModal />
                     <Filtros />
                  </div>

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
                                             <Text>
                                                {cobro.fecha.toLocaleString()}
                                             </Text>
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
                        <div className='flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 mt-2 flex-col sm:flex-row'>
                           <Button
                              className='hidden sm:block'
                              color='red'
                              onClick={() => handleOpen()}>
                              Cerrar
                           </Button>

                           <Pagination
                              count={data.cobrosCount}
                              page={page}
                              handleChangePage={handleChangePage}
                           />
                        </div>
                     </>
                  )}
               </form>
            </FormProvider>
         </ModalCSP>
      </>
   );
}

export default CobrosModal;
