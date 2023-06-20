import { addDays } from '@app/libs/function';
import { builder } from '../builder';
import { prismaYoga } from '../db';

builder.prismaNode('Cobro', {
   id: { field: 'id' },
   fields: (t) => ({
      descripcion: t.exposeString('descripcion'),
      monto: t.field({
         type: 'Decimal',
         resolve: (cobro) => cobro.monto,
      }),
      fecha: t.field({
         type: 'DateTime',
         resolve: (cobro) => cobro.fecha,
      }),
      pagosCount: t.relationCount('pagos'),
   }),
});

const DEFAULT_PAGE_SIZE = 10;

const InputFiltrosCobros = builder.inputType('InputFiltrosCobros', {
   fields: (t) => ({
      descripcion: t.string({ required: false }),
      fechaDesde: t.string({ required: false }),
      fechaHasta: t.string({ required: false }),
   }),
});

builder.queryFields((t) => ({
   cobros: t.prismaField({
      type: ['Cobro'],
      args: {
         skip: t.arg.int(),
         take: t.arg.int(),
         filtros: t.arg({ type: InputFiltrosCobros, required: false }),
      },
      resolve: async (query, _, args, ctx) => {
         return await prismaYoga.cobro.findMany({
            ...query,
            take: args.take ?? DEFAULT_PAGE_SIZE,
            skip: args.skip ?? 0,
            where: {
               descripcion: {
                  contains: args.filtros?.descripcion ?? undefined,
                  mode: 'insensitive',
               },
               perfil: {
                  userId: ctx.session.user.id,
               },
               fecha: {
                  gte: args.filtros?.fechaDesde
                     ? new Date(args.filtros?.fechaDesde)
                     : undefined,
               },
               AND: [
                  {
                     fecha: {
                        lte:
                           args.filtros?.fechaHasta && args.filtros?.fechaDesde
                              ? addDays(new Date(args.filtros?.fechaHasta), 1)
                              : undefined,
                     },
                  },
                  {
                     fecha: {
                        lte:
                           !args.filtros?.fechaHasta && args.filtros?.fechaDesde
                              ? addDays(new Date(args.filtros?.fechaDesde), 1)
                              : undefined,
                     },
                  },
               ],
            },
            include: {
               _count: {
                  select: {
                     pagos: true,
                  },
               },
            },
         });
      },
   }),

   cobrosAdmin: t.prismaField({
      type: ['Cobro'],
      args: {
         skip: t.arg.int(),
         take: t.arg.int(),
         filtros: t.arg({ type: InputFiltrosCobros, required: false }),
      },
      resolve: async (query, _, args, ctx) =>
         await prismaYoga.cobro.findMany({
            ...query,
            take: args.take ?? DEFAULT_PAGE_SIZE,
            skip: args.skip ?? 0,
            where: {
               descripcion: {
                  contains: args.filtros?.descripcion ?? undefined,
                  mode: 'insensitive',
               },
               AND: {
                  fecha: {
                     gte: args.filtros?.fechaDesde
                        ? new Date(args.filtros?.fechaDesde)
                        : undefined,
                     lte: args.filtros?.fechaHasta
                        ? new Date(args.filtros?.fechaHasta)
                        : undefined,
                  },
               },
            },
            include: {
               _count: {
                  select: {
                     pagos: true,
                  },
               },
            },
         }),
   }),

   count: t.field({
      type: 'Int',
      args: {
         skip: t.arg.int(),
         take: t.arg.int(),
         filtros: t.arg({ type: InputFiltrosCobros, required: false }),
      },
      resolve: async (_, args, ctx) =>
         await prismaYoga.cobro.count({
            take: args.take ?? DEFAULT_PAGE_SIZE,
            skip: args.skip ?? 0,
            where: {
               descripcion: {
                  contains: args.filtros?.descripcion ?? undefined,
                  mode: 'insensitive',
               },
            },
         }),
   }),

   cobrosCount: t.field({
      type: 'Int',
      resolve: async (root, args, ctx) =>
         await prismaYoga.cobro.count({
            where: {
               perfil: {
                  userId: ctx.session.user.id,
               },
            },
         }),
   }),
}));
