import { builder } from "@app/graphql/builder";
import "./grupo";
import "./perfil";
import "./cobro";
import "./pago";

builder.mutationType();
builder.queryType();

export const schema = builder.toSchema({});
