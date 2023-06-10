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
  query grupos($skip: Int) {
    grupos(skip: $skip) {
      id
      nombre
      orden
    }
    gruposCount
  }
`;

function Result({ source, data }: { source: string; data: unknown }) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell>Nombre</TableHeaderCell>
          <TableHeaderCell>Orden</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {Array.isArray(data) &&
          data.map((grupo) => {
            return (
              <TableRow key={grupo.id}>
                <TableCell>
                  <Text>{grupo.nombre}</Text>
                </TableCell>
                <TableCell>
                  <Text>{grupo.orden}</Text>
                </TableCell>
                {/* <TableCell>
                  <Badge icon={UserGroupIcon} color="orange">
                    {grupo.participantesCount}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Text>{grupo.cuenta.nombre}</Text>
                </TableCell> */}
              </TableRow>
            );
          })}
      </TableBody>
    </Table>
  );
}

export default function AllGrupos() {
  const [page, setPage] = React.useState(0);
  const result = useQuery(gruposQuery, {
    fetchPolicy: "cache-first",
    variables: {
      skip: page * 10,
    },
  });

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
    result.refetch();
  };

  if (result.loading) return <div>Cargando</div>;

  return (
    <Card className="mt-6">
      <Result source="useSuspenseQuery(userQuery)" data={result.data.grupos} />
      <Pagination
        count={result.data.gruposCount}
        page={page}
        handleChangePage={handleChangePage}
      />
    </Card>
  );
}
