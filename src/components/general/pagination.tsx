import { classNames } from '@app/libs/className';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { Button } from '@tremor/react';
import React from 'react';

export default function Pagination({
  take,
  count,
  page,
  handleChangePage,
}: {
  take: number;
  count: number;
  page: number;
  handleChangePage: (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
}) {
  return (
    <div className='flex flex-col items-center'>
      <span className='text-tremor-default text-tremor-content dark:text-dark-tremor-content'>
        Viendo{' '}
        <span className='font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong'>
          {(page - 1) * take + 1}
        </span>{' '}
        a{' '}
        <span className='font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong'>
          {take * page}
        </span>{' '}
        de{' '}
        <span className='font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong'>
          {count}
        </span>{' '}
        Registros
      </span>
      <div className='inline-flex mt-2 xs:mt-0 space-x-1'>
        <Button
          onClick={(e) => handleChangePage(e, page - 1)}
          size='sm'
          icon={ChevronLeftIcon}
          iconPosition='left'
          color='stone'
          className={classNames(page === 1 ? 'hidden' : '')}>
          <span className='sr-only'>Anterior</span>
          Anterior
        </Button>
        <Button
          onClick={(e) => handleChangePage(e, page + 1)}
          size='sm'
          color='stone'
          icon={ChevronRightIcon}
          iconPosition='right'
          className={classNames(page * take >= count ? 'hidden' : '')}>
          <span className='sr-only'>Next</span>
          Siguiente
        </Button>
      </div>
    </div>
  );
}
