import { QueryReference } from '@apollo/client';
import { useReadQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { SearchSelectPerfilQuery } from '@app/graphql/codegenGenerate/documents.generated';
import { Button, Card, Flex, List, ListItem, Text, TextInput, Title } from '@tremor/react';
import { useState } from 'react';
import { classNames } from '@app/libs/className';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import sweetAlert from 'sweetalert2'

export default function BuscarUsuarioV2({
   onSelect,
   onCancel,
   queryRef,
   handleOpenState,
   onFetchMore,
   openState
}: {
   onSelect: (value: string) => void;
   onCancel: () => void;
   openState: boolean;
   handleOpenState: () => void
   onFetchMore: (value: string) => Promise<void>
   queryRef: QueryReference<SearchSelectPerfilQuery>;
}) {
   const [selectValue, setSelectValue] = useState<
      {
         value: string,
         display?: string
      }>({
         display: '', value: ''
      })
   const { data } = useReadQuery(queryRef);
   const [search, setSearch] = useState<string>('');

   return (
      <>
         <Card className={classNames(openState ? 'hidden' : '','mx-auto min-w-[18rem] max-w-md')}>
            <Flex>
               <Title>{selectValue.display?.trim() === '' ? 'Seleccione a un comercio' : 'Pagar a '+selectValue.display}</Title>
               <Button
                  size='xs'
                  icon={MagnifyingGlassIcon}
                  type='button'
                  onClick={() => handleOpenState()}
               >
                  Buscar
               </Button>
            </Flex>
         </Card>
         <Card className={classNames(openState ? '' : 'hidden', 'mt-2 md:min-w-[442px] min-w-[18rem] max-w-md mx-auto')}>
            <Title>Buscar Comercio</Title>
            <div className='flex space-x-1 max-w-md '>
               <TextInput placeholder='Buscar usuario' onChange={(e) => setSearch(e.target.value)} />
               <Button type='button' size='xs' onClick={() => onFetchMore(search)}>
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
                  {data.buscarPerfiles.map((item) => (
                     <ListItem
                        className={`${selectValue.value === item.id ? 'bg-slate-500/25' : ''
                           } cursor-pointer`}
                        key={item.id}
                        onClick={() => setSelectValue({ value: item.id, display: item.nombre })}
                     >
                        <Flex>
                           <Text>{item.nombre}</Text>
                           <Text>{item.cedula}</Text>
                        </Flex>
                     </ListItem>
                  ))}
               </List>
            </Card>
            <Flex justifyContent='end' className='mt-2 space-y-1 space-x-1'>
               <Button size='xs' color='green' type="button" onClick={() => {
                     onSelect(selectValue.value)
                     handleOpenState()
                  }}>
                  Aceptar
               </Button>
               <Button size='xs' color='red' type="button" onClick={() => onCancel()}>
                  Cancelar
               </Button>
            </Flex>
         </Card>
      </>
   );
}
