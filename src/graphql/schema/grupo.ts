import { builder } from '../builder';
import { prismaYoga } from '../db';

builder.prismaNode('Grupo', {
   id: { field: 'id' },
   fields: (t) => ({
      orden: t.exposeInt('orden'),
      nombre: t.exposeString('nombre'),
      participantesCount: t.relationCount('Participante'),
      cuenta: t.relation('cuenta'),
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
         return await prismaYoga.grupo.findMany({
            ...query,
            take: args.take ?? DEFAULT_PAGE_SIZE,
            skip: args.skip ?? 0,
            where: {
               cuenta: {
                  perfil: {
                     userId: user.id,
                  },
               },
            },
            include: {
               cuenta: {
                  select: {
                     nombre: true,
                  },
               },
               Participante: true,
               _count: {
                  select: {
                     Participante: true,
                  },
               },
            },
         });
      },
   }),

   gruposCount: t.field({
      type: 'Int',
      resolve: async (root, args, ctx) =>
         await prismaYoga.grupo.count({
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
