'use server';

import fs from 'fs';

export async function uploadFileAction(data: FormData) {
   const file = data.get('FileUpload') as Blob | undefined;
   if (file) {
      try {
         const buffer = await file.arrayBuffer();
         await fs.promises.writeFile('public/images/' + file.name, Buffer.from(buffer));
         const path = 'public/images/' + file.name;
         return path;
      } catch (e) {
         console.log(e);
      }
   }
}
