'use client';

import { useFormContext } from 'react-hook-form';

export default function UploadFile() {
   const { register } = useFormContext();
   return (
      <div className='w-full border border-dashed border-gray-500 p-3'>
         <label className='flex h-full cursor-pointer flex-col items-center justify-center py-8 transition-colors duration-150 hover:text-gray-600'>
            <svg
               xmlns='http://www.w3.org/2000/svg'
               className='h-14 w-14'
               fill='none'
               viewBox='0 0 24 24'
               stroke='currentColor'
               strokeWidth={2}
            >
               <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z'
               />
            </svg>
            <strong className='text-sm font-medium'>Select images</strong>

            <input
               className='block h-0 w-0'
               type='file'
               tabIndex={1}
               {...register('file')}
               accept='.jpg,.png'
            />
         </label>
      </div>
   );
}
