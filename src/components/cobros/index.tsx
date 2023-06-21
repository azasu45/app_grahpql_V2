'use client';

import { Bold, Card, Flex, Grid, Metric, Text, Title } from '@tremor/react';
import React, { useState } from 'react';
import Pagination from '../pagination';

export const Cobros = ({
   cobros,
   loading,
   onClick,
   showResults,
   cobrosCount,
   page,
   handleChangePage,
}: {
   cobrosCount: number;
   cobros: {
      id: string;
      descripcion: string;
      monto: number;
      fecha: Date;
      pagosCount: number;
   }[];
   loading?: boolean;
   onClick?: (answerId: string) => Promise<void>;
   page: number;
   handleChangePage: (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
   showResults?: boolean;
}) => {
   return (
      <>
         <Grid numItems={1} numItemsMd={3} numItemsLg={4} className='gap-2'>
            {cobros.map((cobro) => (
               <Card key={cobro.id} className='py-1 px-2'>
                  <Title>{cobro.descripcion}</Title>
                  <Flex className='gap-4 mt-2' alignItems='start'>
                     <Metric className='mt-2 basis-0 whitespace-nowrap'>{cobro.monto} $</Metric>
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
            ))}
         </Grid>

         <Pagination count={cobrosCount} page={page} handleChangePage={handleChangePage} />
      </>
   );
};

export const SkeletonCobros = () => {
   return (
      <Grid numItems={1} numItemsMd={3} numItemsLg={4} className='gap-2 mt-2'>
         <Card className='py-2 px-2 animate-pulse'>
            <div className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4' />
            <div className='h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[150px] mb-2.5' />
            <div className='h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5' />
            <div className='h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[120px] mb-2.5' />
            <div className='h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[90px] mb-2.5' />
            <div className='h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[140px]' />
            <span className='sr-only'>Loading...</span>
         </Card>
      </Grid>
   );
};
