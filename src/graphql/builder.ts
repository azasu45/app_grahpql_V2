import type PrismaTypes from '../../prisma/pothos-types';
import { Prisma } from '@prisma/client';
import SchemaBuilder from '@pothos/core';
import PrismaPlugin from '@pothos/plugin-prisma';
import RelayPlugin from '@pothos/plugin-relay';
import PrismaUtils from '@pothos/plugin-prisma-utils';
import { DateResolver, GraphQLPositiveFloat } from 'graphql-scalars';
import { prisma } from './db';
import { Session } from 'next-auth';
import { GraphQLScalarType } from 'graphql';

const FileScalar = new GraphQLScalarType({
  name: 'File',
  serialize(value) {
    console.log(value);
    if (value instanceof File) {
      return File;
    }
    throw Error('GraphQL Date Scalar serializer expected a `File` object');
  },
});

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
    File: {
      Input: File;
      Output: File;
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
builder.addScalarType('File', FileScalar, {});
