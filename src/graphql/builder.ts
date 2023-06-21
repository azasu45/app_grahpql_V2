import type PrismaTypes from '../../prisma/pothos-types';
import { Prisma } from '@prisma/client';
import SchemaBuilder from '@pothos/core';
import PrismaPlugin from '@pothos/plugin-prisma';
import RelayPlugin from '@pothos/plugin-relay';
import PrismaUtils from '@pothos/plugin-prisma-utils';
import { DateResolver, GraphQLPositiveFloat } from 'graphql-scalars';
import { prisma } from './db';
import { Session } from 'next-auth';

export const builder = new SchemaBuilder<{
   Context: { session: Session };
   Scalars: {
      DateTime: {
         Input: Date;
         Output: Date;
      };
      Decimal: {
         Input: Prisma.Decimal;
         Output: Prisma.Decimal;
      };
   };
   PrismaTypes: PrismaTypes;
}>({
   plugins: [RelayPlugin, PrismaPlugin, PrismaUtils],
   prisma: {
      client: prisma,

      filterConnectionTotalCount: true,
   },
   relayOptions: {
      clientMutationId: 'omit',
      cursorType: 'String',
   },
});

export enum orderBy {
   desc,
   asc,
}

builder.enumType(orderBy, {
   name: 'orderBy',
});

builder.addScalarType('Decimal', GraphQLPositiveFloat, {});
builder.addScalarType('DateTime', DateResolver, {});
