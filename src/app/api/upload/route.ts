import mime from 'mime';
import { NextResponse, NextRequest } from 'next/server';
import { mkdir, stat, writeFile } from 'fs/promises';
import { join } from 'path';

export async function POST(request: NextRequest) {
   const formData = await request.formData();
   const file = formData.get('media') as Blob | null;

   console.log(formData);

   if (!file) {
      return NextResponse.json({ error: 'No es un archivo valido' }, { status: 400 });
   }

   const buffer = Buffer.from(await file.arrayBuffer());
   const relativeUploadDir = `/uploads`;
   const uploadDir = join(process.cwd(), 'public', relativeUploadDir);

   try {
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      const filename = `capture-${uniqueSuffix}.${mime.getExtension(file.type)}`;
      await writeFile(`${uploadDir}/${filename}`, buffer);
      return NextResponse.json({ fileUrl: `${relativeUploadDir}/${filename}` });
   } catch (e) {
      console.error('Error while trying to upload a file\n', e);
      return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
   }
}

/*${file.name.replace(/\.[^/.]+$/, '')}*/
