'use client';

import Image from 'next/image';
import { ChangeEvent, useState } from 'react';
import { useFormContext } from 'react-hook-form';

export default function UploadFile() {
   const [previewUrls, setPreviewUrls] = useState<string[]>([]);

   const { register } = useFormContext();

   return (
      <div className='w-full border border-dashed border-gray-500 p-3'>
         {previewUrls.length > 0 ? (
            <>
               <button
                  type='button'
                  onClick={() => setPreviewUrls([])}
                  className='mb-3 text-sm font-medium text-gray-500 transition-colors duration-300 hover:text-gray-900'
               >
                  Clear Previews
               </button>

               <div className='flex flex-wrap justify-start'>
                  {previewUrls.map((previewUrl, idx) => (
                     <div key={idx} className='w-full p-1.5 object-cover max-h-fit'>
                        <Image
                           alt='file uploader preview'
                           src={previewUrl}
                           width={600}
                           height={600}
                        />
                     </div>
                  ))}
               </div>
            </>
         ) : (
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
                  {...register('file', {
                     onChange: (e: ChangeEvent<HTMLInputElement>) => {
                        const fileInput = e.target;

                        if (!fileInput.files) {
                           alert('No files were chosen');
                           return;
                        }

                        if (!fileInput.files || fileInput.files.length === 0) {
                           alert('Files list is empty');
                           return;
                        }

                        /** Files validation */
                        const validFiles: File[] = [];
                        for (let i = 0; i < fileInput.files.length; i++) {
                           const file = fileInput.files[i];

                           if (file) {
                              if (!file.type.startsWith('image')) {
                                 alert(`File with idx: ${i} is invalid`);
                                 continue;
                              }
                              validFiles.push(file);
                           }
                        }

                        if (!validFiles.length) {
                           alert('No valid files were chosen');
                           return;
                        }

                        setPreviewUrls(
                           validFiles.map((validFile) => URL.createObjectURL(validFile)),
                        ); // we will use this to show the preview of the images
                     },
                  })}
                  accept='.jpg,.png'
               />
            </label>
         )}
      </div>
   );
}
