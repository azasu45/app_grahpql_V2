import { QueryReference } from '@apollo/client';
import { useReadQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { SearchSelectPerfilQuery } from '@app/graphql/codegenGenerate/documents.generated';
import { Button, Card, Flex, List, ListItem, Text, TextInput, Title } from '@tremor/react';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { CrearPagoType } from './pagar';

export default function BuscarUsuarioV2({
   onChangePerfil,
   queryRef,
}: {
   onChangePerfil: (value: string) => Promise<void>;
   queryRef: QueryReference<SearchSelectPerfilQuery>;
}) {
   const { data } = useReadQuery(queryRef);
   const [search, setSearch] = useState<string>('');
   const { setValue, watch } = useFormContext<CrearPagoType>();

   return (
      <>
         <Title>Buscar Comercio</Title>
         <div className='flex space-x-1 max-w-md '>
            <TextInput placeholder='Buscar usuario' onChange={(e) => setSearch(e.target.value)} />
            <Button type='button' size='xs' onClick={() => onChangePerfil(search)}>
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
               {data.buscarPerfiles.map((perfil) => (
                  <ListItem
                     className={`${
                        watch().perfil.id === perfil.id ? 'bg-slate-500/25' : ''
                     } cursor-pointer`}
                     key={perfil.id}
                     onClick={() =>
                        setValue('perfil', {
                           id: perfil.id,
                           nombre: perfil.nombre,
                        })
                     }
                  >
                     <Flex>
                        <Text>{perfil.nombre}</Text>
                        <Text>{perfil.cedula}</Text>
                     </Flex>
                  </ListItem>
               ))}
            </List>
         </Card>
      </>
   );
}
