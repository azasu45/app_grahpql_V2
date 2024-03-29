import * as Types from './types.generated';

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

export type CrearOActualizarPerfilMutationVariables = Types.Exact<{
  input: Types.CrearOActualizarPerfil;
}>;

export type CrearOActualizarPerfilMutation = {
  __typename?: 'Mutation';
  crearOActualizarPerfil?: {
    __typename?: 'Perfil';
    id: string;
    cedula: string;
    userId?: string | null;
  } | null;
};

export type PerfilQueryVariables = Types.Exact<{ [key: string]: never }>;

export type PerfilQuery = {
  __typename?: 'Query';
  perfil?: {
    __typename?: 'Perfil';
    cedula: string;
    id: string;
    nombre: string;
    userId?: string | null;
  } | null;
};

export type MisPagosRecibidosQueryVariables = Types.Exact<{
  skip?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;

export type MisPagosRecibidosQuery = {
  __typename?: 'Query';
  misPagosRecibidosCount: number;
  misPagosRecibidos: Array<{
    __typename?: 'Pago';
    id: string;
    estado: number;
    fecha: any;
    captureImg: string;
    monto: any;
    observacion?: string | null;
    refAdmin?: string | null;
    referencia: string;
    perfilSuscrito: { __typename?: 'Perfil'; nombre: string; comercio?: string | null };
    cobro?: { __typename?: 'Cobro'; descripcion: string; monto: any } | null;
  }>;
};

export type MisPagosRealizadosQueryVariables = Types.Exact<{
  skip?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  filtros?: Types.InputMaybe<Types.InputFiltrosPagos>;
}>;

export type MisPagosRealizadosQuery = {
  __typename?: 'Query';
  misPagosRealizadosCount: number;
  misPagosRealizados: Array<{
    __typename?: 'Pago';
    id: string;
    estado: number;
    fecha: any;
    captureImg: string;
    monto: any;
    observacion?: string | null;
    refAdmin?: string | null;
    referencia: string;
    perfilSuscrito: { __typename?: 'Perfil'; nombre: string; comercio?: string | null };
    cobro?: { __typename?: 'Cobro'; descripcion: string; monto: any } | null;
  }>;
};

export type PagarMutationVariables = Types.Exact<{
  input: Types.CreatePagoInput;
}>;

export type PagarMutation = {
  __typename?: 'Mutation';
  crearPago?: {
    __typename?: 'Pago';
    captureImg: string;
    estado: number;
    fecha: any;
    monto: any;
    observacion?: string | null;
    referencia: string;
  } | null;
};

export type SearchSelectPerfilQueryVariables = Types.Exact<{
  nombre: Types.Scalars['String']['input'];
}>;

export type SearchSelectPerfilQuery = {
  __typename?: 'Query';
  buscarPerfiles: Array<{ __typename?: 'Perfil'; id: string; nombre: string; cedula: string }>;
};

export type PagoCardFragmentFragment = {
  __typename?: 'Pago';
  estado: number;
  fecha: any;
  captureImg: string;
  monto: any;
  observacion?: string | null;
  refAdmin?: string | null;
  referencia: string;
  perfilSuscrito: { __typename?: 'Perfil'; nombre: string; comercio?: string | null };
  cobro?: { __typename?: 'Cobro'; descripcion: string; monto: any } | null;
};

export type CobroCardFragmentFragment = {
  __typename?: 'Cobro';
  descripcion: string;
  fecha: any;
  monto: any;
  pagosCount: number;
};

export const PagoCardFragmentFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'PagoCardFragment' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Pago' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'estado' } },
          { kind: 'Field', name: { kind: 'Name', value: 'fecha' } },
          { kind: 'Field', name: { kind: 'Name', value: 'captureImg' } },
          { kind: 'Field', name: { kind: 'Name', value: 'monto' } },
          { kind: 'Field', name: { kind: 'Name', value: 'observacion' } },
          { kind: 'Field', name: { kind: 'Name', value: 'refAdmin' } },
          { kind: 'Field', name: { kind: 'Name', value: 'referencia' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'perfilSuscrito' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'nombre' } },
                { kind: 'Field', name: { kind: 'Name', value: 'comercio' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'cobro' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'descripcion' } },
                { kind: 'Field', name: { kind: 'Name', value: 'monto' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<PagoCardFragmentFragment, unknown>;
export const CobroCardFragmentFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CobroCardFragment' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Cobro' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'descripcion' } },
          { kind: 'Field', name: { kind: 'Name', value: 'fecha' } },
          { kind: 'Field', name: { kind: 'Name', value: 'monto' } },
          { kind: 'Field', name: { kind: 'Name', value: 'pagosCount' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CobroCardFragmentFragment, unknown>;
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
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'crearCobroPorUsuario' } },
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
export const CrearOActualizarPerfilDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'CrearOActualizarPerfil' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'crearOActualizarPerfil' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'crearOActualizarPerfil' },
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
                { kind: 'Field', name: { kind: 'Name', value: 'cedula' } },
                { kind: 'Field', name: { kind: 'Name', value: 'userId' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CrearOActualizarPerfilMutation,
  CrearOActualizarPerfilMutationVariables
>;
export const PerfilDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Perfil' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'perfil' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'cedula' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'nombre' } },
                { kind: 'Field', name: { kind: 'Name', value: 'userId' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<PerfilQuery, PerfilQueryVariables>;
export const MisPagosRecibidosDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'misPagosRecibidos' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'skip' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'misPagosRecibidos' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'skip' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'skip' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'estado' } },
                { kind: 'Field', name: { kind: 'Name', value: 'fecha' } },
                { kind: 'Field', name: { kind: 'Name', value: 'captureImg' } },
                { kind: 'Field', name: { kind: 'Name', value: 'monto' } },
                { kind: 'Field', name: { kind: 'Name', value: 'observacion' } },
                { kind: 'Field', name: { kind: 'Name', value: 'refAdmin' } },
                { kind: 'Field', name: { kind: 'Name', value: 'referencia' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'perfilSuscrito' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'nombre' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'comercio' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'cobro' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'descripcion' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'monto' } },
                    ],
                  },
                },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'misPagosRecibidosCount' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<MisPagosRecibidosQuery, MisPagosRecibidosQueryVariables>;
export const MisPagosRealizadosDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'misPagosRealizados' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'skip' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'filtros' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'InputFiltrosPagos' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'misPagosRealizados' },
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
                { kind: 'Field', name: { kind: 'Name', value: 'estado' } },
                { kind: 'Field', name: { kind: 'Name', value: 'fecha' } },
                { kind: 'Field', name: { kind: 'Name', value: 'captureImg' } },
                { kind: 'Field', name: { kind: 'Name', value: 'monto' } },
                { kind: 'Field', name: { kind: 'Name', value: 'observacion' } },
                { kind: 'Field', name: { kind: 'Name', value: 'refAdmin' } },
                { kind: 'Field', name: { kind: 'Name', value: 'referencia' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'perfilSuscrito' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'nombre' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'comercio' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'cobro' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'descripcion' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'monto' } },
                    ],
                  },
                },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'misPagosRealizadosCount' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<MisPagosRealizadosQuery, MisPagosRealizadosQueryVariables>;
export const PagarDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'Pagar' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'createPagoInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'crearPago' },
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
                { kind: 'Field', name: { kind: 'Name', value: 'captureImg' } },
                { kind: 'Field', name: { kind: 'Name', value: 'estado' } },
                { kind: 'Field', name: { kind: 'Name', value: 'fecha' } },
                { kind: 'Field', name: { kind: 'Name', value: 'monto' } },
                { kind: 'Field', name: { kind: 'Name', value: 'observacion' } },
                { kind: 'Field', name: { kind: 'Name', value: 'referencia' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<PagarMutation, PagarMutationVariables>;
export const SearchSelectPerfilDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'SearchSelectPerfil' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'nombre' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'buscarPerfiles' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'nombre' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'nombre' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'nombre' } },
                { kind: 'Field', name: { kind: 'Name', value: 'cedula' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<SearchSelectPerfilQuery, SearchSelectPerfilQueryVariables>;
