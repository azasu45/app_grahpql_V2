import type { CodegenConfig } from '@graphql-codegen/cli';
import { printSchema } from 'graphql';
import { schema } from './src/graphql/schema';

const config: CodegenConfig = {
   overwrite: true,
   schema: printSchema(schema),
   documents: ['src/components/**/*.graphql'],
   generates: {
      'src/components/types.generated.ts': { plugins: ['typescript'] },
      'components/': {
         preset: 'near-operation-file',
         presetConfig: {
            extension: '.generated.ts',
            baseTypesPath: 'types.generated.ts',
         },
         plugins: ['typescript-operations', 'typed-document-node'],
      },
   },
};

export default config;
