"use client";

export const dynamic = "force-dynamic";

import React from "react";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import {
  Badge,
  Card,
  Icon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Text,
} from "@tremor/react";
import {
  DocumentTextIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/24/outline";
import Pagination from "@app/components/pagination";
import { Menu, Transition } from "@headlessui/react";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

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
                <TableCell>
                  <div className="flex flex-col justify-center items-center">
                    <Icon
                      icon={DocumentTextIcon}
                      className="h-6 w-6 text-black hover:text-violet-100"
                    />
                    <Menu as="div" className="relative inline-block text-left">
                      <div className="basis-0">
                        <Menu.Button>
                          <EllipsisVerticalIcon className="h-6 w-6 text-black hover:text-violet-100" />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={React.Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items
                          className={classNames(
                            "absolute right-0 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
                          )}
                        >
                          <div className="px-1 py-1 ">
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  className={classNames(
                                    active
                                      ? "bg-violet-500 bg-opacity-20 text-white"
                                      : "text-gray-900",
                                    "group flex w-full items-center rounded-md px-2 py-2 text-sm"
                                  )}
                                >
                                  Editar
                                </button>
                              )}
                            </Menu.Item>
                          </div>
                          <div className="px-1 py-1 ">
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  className={classNames(
                                    active
                                      ? "bg-violet-500 bg-opacity-20 text-white"
                                      : "text-gray-900",
                                    "group flex w-full items-center rounded-md px-2 py-2 text-sm"
                                  )}
                                >
                                  Eliminar
                                </button>
                              )}
                            </Menu.Item>
                          </div>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
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
