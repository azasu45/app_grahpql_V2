import { QueryReference } from '@apollo/client';
import { useReadQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { SearchSelectPerfilQuery } from '@app/graphql/codegenGenerate/documents.generated';
import { Button, Card, Flex, List, ListItem, Text, TextInput, Title } from '@tremor/react';
import React, { Suspense, useState } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { CrearPagoType } from './pagar';

export default function BuscarUsuarioV2({
   onChangePerfil,
   queryRef,
}: {
   onChangePerfil: (value: string) => Promise<void>;
   queryRef: QueryReference<SearchSelectPerfilQuery>;
}) {
   const [search, setSearch] = useState<string>('');

   const { data } = useReadQuery(queryRef);
   const { setValue, watch } = useFormContext<CrearPagoType>();

   return (
      <>
         <Title>Buscar Usuario</Title>
         <div className='flex space-x-1  max-w-md'>
            <TextInput placeholder='Buscar usuario' onChange={(e) => setSearch(e.target.value)} />
            <Button size='xs' onClick={() => onChangePerfil(search)}>
               Buscar
            </Button>
         </div>
         <Card className='mt-2'>
            <List>
               <ListItem>
                  <Flex>
                     <Text>Nombre</Text>
                     <Text>Cedula</Text>
                  </Flex>
               </ListItem>
               <Suspense
                  fallback={
                     <ListItem className='animate-pulse'>
                        <div className='w-8 h-2 rounded-sm bg-slate-500'></div>
                     </ListItem>
                  }
               >
                  {data.buscarPerfiles.map((perfil) => (
                     <ListItem
                        className={`${
                           watch().perfilId === perfil.id ? 'bg-slate-500/25' : ''
                        } cursor-pointer`}
                        key={perfil.id}
                        onClick={() => setValue('perfilId', perfil.id)}
                     >
                        <Flex>
                           <Text>{perfil.nombre}</Text>
                           <Text>{perfil.cedula}</Text>
                        </Flex>
                     </ListItem>
                  ))}
               </Suspense>
            </List>
         </Card>
      </>
   );
}
