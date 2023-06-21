export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: { input: any; output: any; }
  /** Floats that will have a value greater than 0. */
  Decimal: { input: any; output: any; }
};

export type Cobro = Node & {
  __typename?: 'Cobro';
  descripcion: Scalars['String']['output'];
  fecha: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  monto: Scalars['Decimal']['output'];
  pagosCount: Scalars['Int']['output'];
};

export type Grupo = Node & {
  __typename?: 'Grupo';
  id: Scalars['ID']['output'];
  nombre: Scalars['String']['output'];
  orden: Scalars['Int']['output'];
};

export type InputFiltrosCobros = {
  descripcion?: InputMaybe<Scalars['String']['input']>;
  fechaDesde?: InputMaybe<Scalars['String']['input']>;
  fechaHasta?: InputMaybe<Scalars['String']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  agregarCobro: Cobro;
  crearOActualizarPerfil?: Maybe<Perfil>;
};


export type MutationAgregarCobroArgs = {
  input: CrearCobroPorUsuario;
};


export type MutationCrearOActualizarPerfilArgs = {
  input: CrearOActualizarPerfil;
};

export type Node = {
  id: Scalars['ID']['output'];
};

export type Pago = Node & {
  __typename?: 'Pago';
  captureImg: Scalars['String']['output'];
  cobro: Cobro;
  estado: Scalars['Int']['output'];
  fecha: Scalars['DateTime']['output'];
  grupo: Grupo;
  id: Scalars['ID']['output'];
  monto: Scalars['Decimal']['output'];
  observacion: Scalars['String']['output'];
  perfilPago: Perfil;
  perfilSuscrito: Perfil;
  refAdmin: Scalars['String']['output'];
  referencia: Scalars['String']['output'];
};

export type Perfil = Node & {
  __typename?: 'Perfil';
  cedula: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  nombre: Scalars['String']['output'];
  userId?: Maybe<Scalars['ID']['output']>;
};

export type Query = {
  __typename?: 'Query';
  cobros: Array<Cobro>;
  cobrosAdmin: Array<Cobro>;
  cobrosCount: Scalars['Int']['output'];
  count: Scalars['Int']['output'];
  grupos: Array<Grupo>;
  gruposCount: Scalars['Int']['output'];
  node?: Maybe<Node>;
  nodes: Array<Maybe<Node>>;
  pagos: Array<Pago>;
  pagosCount: Scalars['Int']['output'];
  perfiles: Array<Perfil>;
};


export type QueryCobrosArgs = {
  filtros?: InputMaybe<InputFiltrosCobros>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryCobrosAdminArgs = {
  filtros?: InputMaybe<InputFiltrosCobros>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryCountArgs = {
  filtros?: InputMaybe<InputFiltrosCobros>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGruposArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryNodeArgs = {
  id: Scalars['ID']['input'];
};


export type QueryNodesArgs = {
  ids: Array<Scalars['ID']['input']>;
};


export type QueryPagosArgs = {
  orderByFecha?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type CrearCobroPorUsuario = {
  descripcion: Scalars['String']['input'];
  monto: Scalars['Float']['input'];
};

export type CrearOActualizarPerfil = {
  cedula: Scalars['String']['input'];
  nombre: Scalars['String']['input'];
};

export enum OrderBy {
  Asc = 'asc',
  Desc = 'desc'
}
