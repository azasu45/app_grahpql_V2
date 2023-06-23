import * as Types from '../components/types.generated';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type CobrosQueryVariables = Types.Exact<{
   skip?: Types.InputMaybe<Types.Scalars['Int']['input']>;
   filtros?: Types.InputMaybe<Types.InputFiltrosCobros>;
}>;

export type CobrosQuery = {
   __typename?: 'Query';
   cobrosCount: number;
   cobros: Array<{
      __typename?: 'Cobro';
      id: string;
      monto: any;
      descripcion: string;
      fecha: any;
      pagosCount: number;
   }>;
};

export type AgregarCobroMutationVariables = Types.Exact<{
   input: Types.CrearCobroPorUsuario;
}>;

export type AgregarCobroMutation = {
   __typename?: 'Mutation';
   agregarCobro: { __typename?: 'Cobro'; id: string; descripcion: string; fecha: any; monto: any };
};

export const CobrosDocument = {
   kind: 'Document',
   definitions: [
      {
         kind: 'OperationDefinition',
         operation: 'query',
         name: { kind: 'Name', value: 'Cobros' },
         variableDefinitions: [
            {
               kind: 'VariableDefinition',
               variable: { kind: 'Variable', name: { kind: 'Name', value: 'skip' } },
               type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
            },
            {
               kind: 'VariableDefinition',
               variable: { kind: 'Variable', name: { kind: 'Name', value: 'filtros' } },
               type: { kind: 'NamedType', name: { kind: 'Name', value: 'InputFiltrosCobros' } },
            },
         ],
         selectionSet: {
            kind: 'SelectionSet',
            selections: [
               {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'cobros' },
                  arguments: [
                     {
                        kind: 'Argument',
                        name: { kind: 'Name', value: 'skip' },
                        value: { kind: 'Variable', name: { kind: 'Name', value: 'skip' } },
                     },
                     {
                        kind: 'Argument',
                        name: { kind: 'Name', value: 'filtros' },
                        value: { kind: 'Variable', name: { kind: 'Name', value: 'filtros' } },
                     },
                  ],
                  selectionSet: {
                     kind: 'SelectionSet',
                     selections: [
                        { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                        { kind: 'Field', name: { kind: 'Name', value: 'monto' } },
                        { kind: 'Field', name: { kind: 'Name', value: 'descripcion' } },
                        { kind: 'Field', name: { kind: 'Name', value: 'fecha' } },
                        { kind: 'Field', name: { kind: 'Name', value: 'pagosCount' } },
                     ],
                  },
               },
               { kind: 'Field', name: { kind: 'Name', value: 'cobrosCount' } },
            ],
         },
      },
   ],
} as unknown as DocumentNode<CobrosQuery, CobrosQueryVariables>;
export const AgregarCobroDocument = {
   kind: 'Document',
   definitions: [
      {
         kind: 'OperationDefinition',
         operation: 'mutation',
         name: { kind: 'Name', value: 'AgregarCobro' },
         variableDefinitions: [
            {
               kind: 'VariableDefinition',
               variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
               type: {
                  kind: 'NonNullType',
                  type: {
                     kind: 'NamedType',
                     name: { kind: 'Name', value: 'crearCobroPorUsuario' },
                  },
               },
            },
         ],
         selectionSet: {
            kind: 'SelectionSet',
            selections: [
               {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'agregarCobro' },
                  arguments: [
                     {
                        kind: 'Argument',
                        name: { kind: 'Name', value: 'input' },
                        value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
                     },
                  ],
                  selectionSet: {
                     kind: 'SelectionSet',
                     selections: [
                        { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                        { kind: 'Field', name: { kind: 'Name', value: 'descripcion' } },
                        { kind: 'Field', name: { kind: 'Name', value: 'fecha' } },
                        { kind: 'Field', name: { kind: 'Name', value: 'monto' } },
                     ],
                  },
               },
            ],
         },
      },
   ],
} as unknown as DocumentNode<AgregarCobroMutation, AgregarCobroMutationVariables>;
