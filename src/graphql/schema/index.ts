import { builder } from '@app/graphql/builder';
import './grupo';
import './cuenta';
import './perfil';
import './cobro';
import './participante';
import './pago';

builder.mutationType();
builder.queryType();

export const schema = builder.toSchema({});
