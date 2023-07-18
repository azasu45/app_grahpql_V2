'use client';
/*React and Next */
import { Fragment } from 'react';
import Image from 'next/image';
/*Backend */
import { useFragment } from '@apollo/experimental-nextjs-app-support/ssr';
import { PagoCardFragmentFragmentDoc } from '@app/graphql/codegenGenerate/documents.generated';
/*FrontEnd */
import {
  Badge,
  Card,
  Flex,
  Icon,
  Subtitle,
  Text,
  Title,
  Metric,
  Bold,
  type Color,
} from '@tremor/react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
/* Helpers */
import { classNames } from '@app/libs/className';

import {
  CurrencyDollarIcon,
  DocumentTextIcon,
  EyeIcon,
  UserCircleIcon,
} from '@heroicons/react/24/solid';

export function PagoCard({ id }: { id: string }) {
  const { data, complete } = useFragment({
    fragment: PagoCardFragmentFragmentDoc,
    from: `Pago:${id}`,
  });

  function getState(state?: number): Color {
    if (!state) return 'red';
    if (state === 1) return 'yellow';
    return 'green';
  }

  return (
    <Menu
      as={Card}
      className={`relative flex flex-col justify-between rounded-tl-3xl lg:w-full h-[6rem]`}
      decoration='right'
      decorationColor={getState(data.estado)}>
      <div className='absolute left-0 top-0 h-[4rem] w-[4rem] -translate-x-2 -translate-y-2 rounded-full border-[5px] border-gray-50 dark:border-gerenal-principal'>
        <div
          className={classNames(
            !complete ? 'animate-pulse' : '',
            'absolute inset-0 overflow-hidden rounded-[50%] bg-slate-600'
          )}>
          {complete && (
            <>
              <div className='absolute h-full w-full bg-black/25 z-50 inset-0 flex justify-center items-center'>
                <Icon
                  icon={EyeIcon}
                  size='lg'
                  color={getState(data.estado)}
                  className='hover:text-white '
                />
              </div>
              <Image
                className='absolute h-full w-full object-cover z-40 cursor-pointer'
                width={800}
                height={600}
                alt={`Pago-Image-${data.referencia}`}
                src={data?.captureImg ?? '/images/capture-1.jpg'}
              />
            </>
          )}
        </div>
      </div>
      <Flex
        className='absolute inset-0 gap-1 px-2'
        flexDirection='col'
        justifyContent='between'
        alignItems='start'>
        <div className='w-full pl-12'>
          <Flex>
            <div>
              <Flex alignItems='start' justifyContent='start'>
                <Icon
                  size='xl'
                  color={getState(data.estado)}
                  className='p-0'
                  icon={CurrencyDollarIcon}
                />
                <Metric className='leading-8'>{data.monto}</Metric>
              </Flex>
              <Flex alignItems='center' justifyContent='start'>
                <Icon
                  size='sm'
                  color={getState(data.estado)}
                  className='p-0'
                  icon={DocumentTextIcon}
                />
                <Title className='leading-tight'> {data.referencia}</Title>
              </Flex>

              {data.refAdmin && (
                <Badge className='w-full text-ellipsis text-xs'>
                  {data.refAdmin ?? 'Agregar referencia personal'}
                </Badge>
              )}
              <Flex alignItems='center' justifyContent='start' className='ml-1'>
                <Icon
                  size='xs'
                  color={getState(data.estado)}
                  className='p-0'
                  icon={UserCircleIcon}
                />
                <Subtitle className='text-sm leading-snug'>
                  {data.perfilSuscrito?.comercio ?? data.perfilSuscrito?.nombre}
                </Subtitle>
              </Flex>
              <Subtitle className='text-sm leading-snug'>
                {data?.cobro ? (
                  <>
                    {data.cobro.descripcion} - {data.cobro.monto}
                  </>
                ) : (
                  <></>
                )}
              </Subtitle>
            </div>
            <Menu.Button>
              <Icon icon={ChevronRightIcon} className='ui-open:rotate-90 ui-open:transform' />
            </Menu.Button>
          </Flex>
        </div>
      </Flex>
      <Transition
        as={Fragment}
        enter='transition ease-out duration-100'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'>
        <Menu.Items className='absolute right-0 mt-8 w-full z-[1000] bg-white origin-top-right ring-1 ring-opacity-5 rounded-md'>
          <Menu.Item as={'div'} className='p-1'>
            <Text>
              <Bold>Observación</Bold>
            </Text>
            <Text>{data.observacion}</Text>
          </Menu.Item>
          <Menu.Item as={'div'} className='p-1'>
            <ul className='relative grid w-full grid-cols-3 justify-evenly [&>li:not(:last-child)]:border-r [&>li:not(:last-child)]:border-tremor-content-emphasis [&>li]:px-1'>
              <li>
                <Text className='flex flex-col text-center'>
                  Fecha
                  <span>{data.fecha}</span>
                </Text>
              </li>
              <li>
                <Text className='flex flex-col text-center'>
                  Monto
                  <span>{data.monto}</span>
                </Text>
              </li>
              <li>
                <Text className='flex flex-col text-center'>
                  Estado
                  <span>{data.estado}</span>
                </Text>
              </li>
            </ul>
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
