import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import React from 'react';

function classNames(...classes: string[]) {
   return classes.filter(Boolean).join(' ');
}

export default function Pagination({
   count,
   page,
   rowsPerPage,
   handleChangePage,
}: {
   count: number;
   page: number;
   rowsPerPage?: number;
   handleChangePage: (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
}) {
   return (
      <>
         <div className='flex flex-1 justify-between sm:hidden w-full mt-1'>
            <button
               onClick={(e) => handleChangePage(e, page - 1)}
               className='relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50'
            >
               Previous
            </button>
            <button
               onClick={(e) => handleChangePage(e, page + 1)}
               className='relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50'
            >
               Next
            </button>
         </div>
         <div className='hidden sm:flex sm:flex-1 sm:items-center sm:justify-between'>
            <div>
               {/* <p className='text-sm text-gray-700'>
                  Showing <span className='font-medium'>1</span> to{' '}
                  <span className='font-medium'>10</span> of{' '}
                  <span className='font-medium'>97</span> results
               </p> */}
            </div>
            <div>
               <nav
                  className='isolate inline-flex -space-x-px rounded-md shadow-sm'
                  aria-label='Pagination'
               >
                  <button
                     onClick={(e) => handleChangePage(e, page - 1)}
                     className={classNames(
                        page === 0 || count <= 10 ? 'hidden' : 'inline-flex',
                        'relative items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0',
                     )}
                  >
                     <span className='sr-only'>Previous</span>
                     <ChevronLeftIcon className='h-5 w-5' aria-hidden='true' />
                  </button>
                  <p
                     aria-current='page'
                     className=' relative z-10 inline-flex items-center px-4 py-2 text-sm font-semibold text-black focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                  >
                     {count >= 10 ? (
                        <span>
                           {page * 10 + 1} - {10 * (page + 1)} of {count}
                        </span>
                     ) : (
                        <span>
                           {count} of {count}
                        </span>
                     )}
                  </p>
                  <button
                     onClick={(e) => handleChangePage(e, page + 1)}
                     className={classNames(
                        page * 10 === count || count <= 10 ? 'hidden' : 'inline-flex',
                        'relative items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0',
                     )}
                  >
                     <span className='sr-only'>Next</span>
                     <ChevronRightIcon className='h-5 w-5' aria-hidden='true' />
                  </button>
               </nav>
            </div>
         </div>
      </>
   );
}
