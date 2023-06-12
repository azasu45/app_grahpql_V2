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
import Image from "next/image";
import Pagination from "@app/components/pagination";

const gruposQuery = gql`
  query Pagos($skip: Int!) {
    pagos(skip: $skip) {
      id
      referencia
      monto
      fecha
      captureImg
      cobro {
        id
        descripcion
      }
    }
    pagosCount
  }
`;

function Result({ source, data }: { source: string; data: unknown }) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell>Referencia</TableHeaderCell>
          <TableHeaderCell>Fecha</TableHeaderCell>
          <TableHeaderCell>Monto</TableHeaderCell>
          <TableHeaderCell>Cobro</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {Array.isArray(data) &&
          data.map((pago) => {
            return (
              <TableRow key={pago.id}>
                <TableCell>
                  <Image
                    src={pago.captureImg}
                    height={32}
                    width={32}
                    alt={`capture-${pago.id}`}
                  />
                  <Text>{pago.referencia}</Text>
                </TableCell>
                <TableCell>
                  <Text>{pago.fecha}</Text>
                </TableCell>
                <TableCell>
                  <Text>{pago.monto}</Text>
                </TableCell>
                {/* <TableCell>
                           <Badge
                              icon={UserGroupIcon}
                              color='orange'>
                              {pago.}
                           </Badge>
                        </TableCell> */}

                <TableCell>
                  <Text>{pago.cobro.descripcion}</Text>
                </TableCell>
              </TableRow>
            );
          })}
      </TableBody>
    </Table>
  );
}

export default function AllPagos() {
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
      <Result source="useSuspenseQuery(userQuery)" data={data.pagos} />
      <Pagination
        count={data.pagosCount}
        page={page}
        handleChangePage={handleChangePage}
      />
    </Card>
  );
}
