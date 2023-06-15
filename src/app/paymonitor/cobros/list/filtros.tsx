"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
  Flex,
  TextInput,
  DateRangePicker,
  DateRangePickerValue,
} from "@tremor/react";
import {} from "react-hook-form";
import React from "react";

function Filtros() {
  const [value, setValue] = React.useState<DateRangePickerValue>({
    from: new Date(2023, 1, 1),
    to: new Date(),
  });

  return (
    <>
      <Flex className="mt-1 gap-1 flex-wrap md:flex-nowrap">
        <TextInput
          className="w-full"
          placeholder="Buscar por nombre"
          icon={MagnifyingGlassIcon}
        />
        <DateRangePicker className="mx-auto w-full" />
      </Flex>
    </>
  );
}

export default Filtros;
