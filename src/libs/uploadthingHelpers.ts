import { generateReactHelpers } from '@uploadthing/react/hooks';

import type { OurFileRouter } from '@app/app/api/uploadthing/core';

export const { useUploadThing, uploadFiles } = generateReactHelpers<OurFileRouter>();
