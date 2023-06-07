import { builder } from '../builder';
import { prismaYoga } from '../db';

builder.prismaNode('Cobro', {
   id: { field: 'id' },
   fields: (t) => ({
      descripcion: t.exposeString('descripcion'),
      monto: t.exposeFloat('monto'),
      cuentaId: t.exposeString('cuentaId'),
      fecha: t.field({
         type: 'DateTime',
         resolve: (cobro) => cobro.fecha,
      }),
      pagosCount: t.relationCount('pagos'),
      cuenta: t.relation('cuenta'),
   }),
});

const DEFAULT_PAGE_SIZE = 10;

builder.queryFields((t) => ({
   cobros: t.prismaField({
      type: ['Cobro'],
      args: {
         skip: t.arg.int(),
         take: t.arg.int(),
      },
      resolve: async (query, _, args, ctx) =>
         await prismaYoga.cobro.findMany({
            ...query,
            take: args.take ?? DEFAULT_PAGE_SIZE,
            skip: args.skip ?? 0,
            where: {
               cuenta: {
                  perfil: {
                     userId: ctx.session.user.id,
                  },
               },
            },
            include: {
               cuenta: true,
               _count: {
                  select: {
                     pagos: true,
                  },
               },
            },
         }),
   }),

   cobrosCount: t.field({
      type: 'Int',
      resolve: async (root, args, ctx) =>
         await prismaYoga.cobro.count({
            where: {
               cuenta: {
                  perfil: {
                     userId: ctx.session.user.id,
                  },
               },
            },
         }),
   }),
}));
