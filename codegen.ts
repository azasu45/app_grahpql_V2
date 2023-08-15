import type { CodegenConfig } from '@graphql-codegen/cli';
import { printSchema } from 'graphql';
import { schema } from './src/graphql/schema';

const config: CodegenConfig = {
  overwrite: true,
  schema: printSchema(schema),
  documents: ['src/graphql/codegenGenerate/**/*.graphql'],
  generates: {
    'src/graphql/codegenGenerate/types.generated.ts': { plugins: ['typescript'] },
    'src/graphql/codegenGenerate': {
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
