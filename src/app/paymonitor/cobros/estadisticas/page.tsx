import { Card, Grid, Text, Title } from '@tremor/react';

function Page() {
  return (
    <main>
      <Title>Estadisticas</Title>
      <Text>Lorem ipsum dolor sit amet, consetetur sadipscing elitr.</Text>
      <Grid numItemsMd={2} className='mt-6 gap-6'>
        <Card>
          <div className='h-44' />
        </Card>
        <Card>
          <div className='h-44' />
        </Card>
        <Card>
          <div className='h-44' />
        </Card>
        <Card>
          <div className='h-44' />
        </Card>
        <Card>
          <div className='h-44' />
        </Card>
        <Card>
          <div className='h-44' />
        </Card>
      </Grid>
    </main>
  );
}

export default Page;
