"use client";

export const dynamic = "force-dynamic";

import React from "react";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import {
  Badge,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Text,
} from "@tremor/react";
import { UserGroupIcon } from "@heroicons/react/24/outline";
import Pagination from "@app/components/pagination";

const gruposQuery = gql`
  query Cobros($skip: Int) {
    cobros(skip: $skip) {
      id
      monto
      descripcion
      fecha
      pagosCount
    }
    cobrosCount
  }
`;

function Result({ source, data }: { source: string; data: unknown }) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell>Descripcion</TableHeaderCell>
          <TableHeaderCell>Fecha</TableHeaderCell>
          <TableHeaderCell>Monto</TableHeaderCell>
          <TableHeaderCell>Pagos</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {Array.isArray(data) &&
          data.map((cobro) => {
            return (
              <TableRow key={cobro.id}>
                <TableCell>
                  <Text>{cobro.descripcion}</Text>
                </TableCell>
                <TableCell>
                  <Text>{cobro.fecha}</Text>
                </TableCell>
                <TableCell>
                  <Text>{cobro.monto}</Text>
                </TableCell>
                <TableCell>
                  <Badge icon={UserGroupIcon} color="orange">
                    {cobro.pagosCount}
                  </Badge>
                </TableCell>
                {/* <TableCell>
                  <Text>{cobro.cuenta.nombre}</Text>
                </TableCell> */}
              </TableRow>
            );
          })}
      </TableBody>
    </Table>
  );
}

export default function AllCobros() {
  const [page, setPage] = React.useState(0);
  const { data, loading, fetchMore } = useQuery(gruposQuery, {
    fetchPolicy: "cache-first",
    variables: {
      skip: page * 10,
    },
  });

  const handleChangePage = async (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
    await fetchMore({
      variables: {
        skip: page * 10,
      },
    });
  };

  if (loading) return <div>Cargando</div>;

  return (
    <Card className="mt-6">
      <Result source="useSuspenseQuery(userQuery)" data={data.cobros} />
      <Pagination
        count={data.cobrosCount}
        page={page}
        handleChangePage={handleChangePage}
      />
    </Card>
  );
}
