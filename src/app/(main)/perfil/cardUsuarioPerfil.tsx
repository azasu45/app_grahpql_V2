import { Button, Card, Flex, Subtitle, Title } from '@tremor/react';
import { User } from 'next-auth';
import Image from 'next/image';

export default function CardUsuarioPerfil({ user }: { user?: User }) {
  return (
    <Card className='p-2'>
      <Flex>
        <Image
          className='p-1'
          src={user?.image ?? '/images/avatar.png'}
          height={98}
          width={98}
          alt='user perfil image'
        />
        <Flex flexDirection='col' className='space-y-2'>
          <div className='mr-auto'>
            <Title className='text-base'>{user?.name}</Title>
            <Subtitle className='text-sm'>{user?.email}</Subtitle>
          </div>
          <Button className='mr-auto' size='xs'>
            Cambiar Imagen
          </Button>
        </Flex>
      </Flex>
    </Card>
  );
}
