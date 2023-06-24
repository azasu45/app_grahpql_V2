import { Col, Divider, Grid } from '@tremor/react';
import PerfilDataForm from './perfilDataForm';
import CardUsuarioPerfil from './cardUsuarioPerfil';
import HeaderPerfil from './headerPerfil';
import { getServerSession } from 'next-auth';
import { authOptions } from '@app/app/api/auth/[...nextauth]/route';

async function Page() {
   const session = await getServerSession(authOptions);

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
            <PerfilDataForm />
         </Col>
      </Grid>
   );
}
export default Page;
