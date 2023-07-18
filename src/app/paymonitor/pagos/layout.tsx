import { Flex, Text, Title } from '@tremor/react';
import PageNavbar from './pageNavbar';

const navigation = [
  { name: 'Todos', href: '/paymonitor/pagos' },
  { name: 'Estadísticas', href: '/paymonitor/pagos/estadisticas' },
];

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Flex>
        <Title>Mis Pagos</Title>
      </Flex>
      <Text>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed ipsa eligendi voluptatibus.
      </Text>
      <PageNavbar navlinks={navigation} />

      {children}
    </>
  );
}
