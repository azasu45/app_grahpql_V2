import { Callout, Col, Divider, Grid } from '@tremor/react';
import PerfilDataForm from './perfilDataForm';
import CardUsuarioPerfil from './cardUsuarioPerfil';
import HeaderPerfil from './headerPerfil';
import { getServerSession } from 'next-auth';
import { authOptions } from '@app/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import { getClient } from '@app/libs/apollo-client';
import { PerfilDocument } from '@app/components/documents.generated';

async function Page() {
   const session = await getServerSession(authOptions);

   if (!session) redirect('/api/auth/signin');

   const { data, error } = await getClient().query({
      query: PerfilDocument,
   });

   return (
      <Grid className='px-4 md:px-6 pt-16 gap-2' numItems={1} numItemsLg={3}>
         <Col numColSpan={3}>
            <HeaderPerfil complete={session?.user.complete} />
            <Divider />
         </Col>
         <Col numColSpan={3} numColSpanMd={1}>
            <CardUsuarioPerfil user={session?.user} />
         </Col>
         <Col numColSpan={3} numColSpanMd={2}>
            <PerfilDataForm
               defaultValues={{
                  cedula: data.perfil?.cedula ?? '',
                  nombre: data.perfil?.nombre ?? session.user.name ?? '',
               }}
            />
         </Col>

         <Callout title='error'>{error?.message}</Callout>
      </Grid>
   );
}
export default Page;
