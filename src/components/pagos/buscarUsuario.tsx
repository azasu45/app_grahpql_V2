import { QueryReference } from '@apollo/client';
import { useReadQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { SearchSelectItem } from '@tremor/react';
import { Controller, useFormContext } from 'react-hook-form';
import { SearchSelectPerfilQuery } from '../../graphql/codegenGenerate/documents.generated';
import { CrearPagoType } from './pagar';
import { Suspense } from 'react';
import SearchSelect from '../general/SearchSelect';

export default function BuscarUsuario({
  queryRef,
  onChangePerfil,
}: {
  onChangePerfil: (value: string) => Promise<void>;
  queryRef: QueryReference<SearchSelectPerfilQuery>;
}) {
  const { data } = useReadQuery(queryRef);
  const { control } = useFormContext<CrearPagoType>();

  return (
    <Controller
      control={control}
      name='perfilId'
      render={({ field: { onBlur, ref, value, onChange } }) => (
        <SearchSelect
          onValueChange={onChange}
          onInputChange={(value) => {
            onChangePerfil(value);
          }}
          value={value}
          onBlur={onBlur}
          ref={ref}>
          <Suspense
            fallback={
              <SearchSelectItem value='' className='animate-pulse'>
                <div className='h-4 w-10 bg-slate-500'></div>
              </SearchSelectItem>
            }>
            {data.buscarPerfiles.map((perfil) => (
              <SearchSelectItem value={perfil.id} key={perfil.id}>
                {perfil.nombre}({perfil.cedula})
              </SearchSelectItem>
            ))}
          </Suspense>
        </SearchSelect>
      )}
    />
  );
}
