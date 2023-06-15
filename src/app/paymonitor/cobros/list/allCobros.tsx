'use client';

export const dynamic = 'force-dynamic';

import React, { Fragment } from 'react';
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { Badge, Card, Flex, Icon, Text } from '@tremor/react';
import {
   EllipsisVerticalIcon,
   BanknotesIcon,
   DocumentTextIcon,
} from '@heroicons/react/24/outline';
import Pagination from '@app/components/pagination';
import { Menu, Transition } from '@headlessui/react';
import { useForm, useFormContext } from 'react-hook-form';
import Filtros from './filtros';

const gruposQuery = gql`
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

function classNames(...classes: string[]) {
   return classes.filter(Boolean).join(' ');
}

function Result({ data }: { data: unknown }) {
   return (
      <>
         <div>
            {Array.isArray(data) &&
               data.map((cobro) => {
                  return (
                     <Card
                        key={cobro.id}
                        className='mb-3'>
                        <Flex
                           justifyContent='between'
                           alignItems='center'>
                           <Flex
                              className='basis-0 min-w-fit'
                              flexDirection='col'
                              alignItems='start'>
                              <Text className='font-bold'>
                                 {cobro.descripcion}
                              </Text>
                              <Text>Monto: {cobro.monto}</Text>
                           </Flex>
                           <Flex
                              flexDirection='col'
                              alignItems='center'>
                              <Text>{cobro.fecha}</Text>
                              <Badge
                                 icon={BanknotesIcon}
                                 color='orange'>
                                 {cobro.pagosCount}
                              </Badge>
                           </Flex>
                           <div className='flex flex-col justify-center items-center'>
                              <Icon
                                 icon={DocumentTextIcon}
                                 className='h-6 w-6 text-black hover:text-violet-100'
                              />
                              <Menu
                                 as='div'
                                 className='relative inline-block text-left'>
                                 <div className='basis-0'>
                                    <Menu.Button>
                                       <EllipsisVerticalIcon className='h-6 w-6 text-black hover:text-violet-100' />
                                    </Menu.Button>
                                 </div>
                                 <Transition
                                    as={Fragment}
                                    enter='transition ease-out duration-100'
                                    enterFrom='transform opacity-0 scale-95'
                                    enterTo='transform opacity-100 scale-100'
                                    leave='transition ease-in duration-75'
                                    leaveFrom='transform opacity-100 scale-100'
                                    leaveTo='transform opacity-0 scale-95'>
                                    <Menu.Items
                                       className={classNames(
                                          'absolute right-0 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50'
                                       )}>
                                       <div className='px-1 py-1 '>
                                          <Menu.Item>
                                             {({ active }) => (
                                                <button
                                                   className={classNames(
                                                      active
                                                         ? 'bg-violet-500 bg-opacity-20 text-white'
                                                         : 'text-gray-900',
                                                      'group flex w-full items-center rounded-md px-2 py-2 text-sm'
                                                   )}>
                                                   Editar
                                                </button>
                                             )}
                                          </Menu.Item>
                                       </div>
                                       <div className='px-1 py-1 '>
                                          <Menu.Item>
                                             {({ active }) => (
                                                <button
                                                   className={classNames(
                                                      active
                                                         ? 'bg-violet-500 bg-opacity-20 text-white'
                                                         : 'text-gray-900',
                                                      'group flex w-full items-center rounded-md px-2 py-2 text-sm'
                                                   )}>
                                                   Eliminar
                                                </button>
                                             )}
                                          </Menu.Item>
                                       </div>
                                    </Menu.Items>
                                 </Transition>
                              </Menu>
                           </div>
                        </Flex>
                     </Card>
                  );
               })}
         </div>
      </>
   );
}

type filtros = {
   descripcion: string;
};

export default function AllCobros() {
   const [page, setPage] = React.useState(0);

   const { handleSubmit } = useFormContext<filtros>();

   const onSubmit = handleSubmit(async (data) => {
      await fetchMore({
         variables: {
            skip: page * 10,
            filtros: {
               descripcion: data.descripcion,
            },
         },
      });
   });

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
      <form
         className='mt-6'
         onSubmit={onSubmit}>
         <Filtros />
         <Result data={data.cobros} />
         <Pagination
            count={data.cobrosCount}
            page={page}
            handleChangePage={handleChangePage}
         />
      </form>
   );
}
