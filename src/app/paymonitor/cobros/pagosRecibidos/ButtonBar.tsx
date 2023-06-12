"use client";

import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { Flex, Icon, Subtitle } from "@tremor/react";
import React from "react";
import GruposModal from "../list/gruposModal";
import CobrosModal from "../list/cobrosModal";
import DrawerFilters from "@app/components/drawerFilters";

function ButtonBar() {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [isOpenCobros, setIsOpenCobros] = React.useState<boolean>(false);
  const [isOpenFiltros, setIsOpenFiltros] = React.useState<boolean>(false);

  const handleOpen = (force?: boolean) => {
    setIsOpen(force ? force : !isOpen);
  };

  const handleOpenCobros = (force?: boolean) => {
    setIsOpenCobros(force ? force : !isOpenCobros);
  };
  const handleOpenFiltros = (force?: boolean) => {
    setIsOpenFiltros(force ? force : !isOpenFiltros);
  };

  return (
    <Flex className="mt-4" alignItems="center">
      <Flex className="space-x-0.5" justifyContent="start" alignItems="center">
        <Subtitle>Cobros</Subtitle>
        <Icon
          icon={InformationCircleIcon}
          variant="simple"
          tooltip="descripción"
        />
      </Flex>
      <div className="flex gap-1 flex-row flex-nowrap">
        <GruposModal open={isOpen} handleOpen={handleOpen} />
        <CobrosModal open={isOpenCobros} handleOpen={handleOpenCobros} />
        <DrawerFilters open={isOpenFiltros} handleOpen={handleOpenFiltros} />
      </div>
    </Flex>
  );
}

export default ButtonBar;
