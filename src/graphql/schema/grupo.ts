import { builder } from '../builder';
import { prisma } from '../db';

builder.prismaNode('Grupo', {
  id: { field: 'id' },
  fields: (t) => ({
    orden: t.exposeInt('orden'),
    nombre: t.exposeString('nombre'),
  }),
});

const DEFAULT_PAGE_SIZE = 10;

builder.queryFields((t) => ({
  grupos: t.prismaField({
    type: ['Grupo'],
    args: {
      take: t.arg.int(),
      skip: t.arg.int(),
    },
    resolve: async (query, _, args, ctx) => {
      const user = ctx.session.user;
      return await prisma.grupo.findMany({
        ...query,
        take: args.take ?? DEFAULT_PAGE_SIZE,
        skip: args.skip ?? 0,
        where: {
          perfil: {
            userId: user.id,
          },
        },
        include: {
          Pago: true,
        },
      });
    },
  }),

  gruposCount: t.field({
    type: 'Int',
    resolve: async (root, args, ctx) =>
      await prisma.grupo.count({
        where: {
          perfil: {
            userId: ctx.session.user.id,
          },
        },
      }),
  }),
}));
