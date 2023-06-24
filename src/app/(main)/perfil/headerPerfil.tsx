import { Callout, Flex, Title } from '@tremor/react';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';

export default function HeaderPerfil({ complete }: { complete?: boolean }) {
   return (
      <Flex
         flexDirection='col'
         justifyContent='between'
         alignItems='center'
         className='mt-4 md:flex-row md:gap-2'
      >
         <Title className='text-2xl'>Perfil de usuario</Title>
         {complete && (
            <Callout title='Acción requerida' color='red' icon={ExclamationCircleIcon}>
               Por favor complete y guarde su perfil para seguir usando la aplicación.
            </Callout>
         )}
      </Flex>
   );
}
