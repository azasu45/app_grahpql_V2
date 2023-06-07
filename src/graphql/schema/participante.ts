import { builder } from '../builder';
import { prismaYoga } from '../db';

builder.prismaNode('Participante', {
   id: { field: 'id' },
   fields: (t) => ({
      nombre: t.exposeString('nombre', { nullable: true }),
      cedula: t.exposeString('cedula', { nullable: true }),
      image: t.exposeString('image', { nullable: true }),
      pagos: t.relation('pagos'),
      grupo: t.relation('grupo'),
      perfil: t.relation('perfil'),
      pagosCount: t.relationCount('pagos'),
   }),
});

const DEFAULT_PAGE_SIZE = 10;

builder.queryFields((t) => ({
   participantes: t.prismaField({
      type: ['Participante'],
      args: {
         skip: t.arg.int(),
         take: t.arg.int(),
      },
      resolve: async (query, _, args, ctx) => {
         const user = ctx.session.user;
         return await prismaYoga.participante.findMany({
            ...query,
            skip: args.skip ?? 0,
            take: args.take ?? DEFAULT_PAGE_SIZE,
            where: {
               grupo: {
                  cuenta: {
                     perfil: {
                        userId: user.id,
                     },
                  },
               },
            },
            include: {
               grupo: {
                  select: {
                     nombre: true,
                     cuenta: {
                        select: {
                           nombre: true,
                        },
                     },
                  },
               },
               _count: {
                  select: {
                     pagos: true,
                  },
               },
            },
         });
      },
   }),

   participantesCount: t.field({
      type: 'Int',
      resolve: async (root, args, ctx) =>
         await prismaYoga.participante.count({
            where: {
               grupo: {
                  cuenta: {
                     perfil: {
                        userId: ctx.session.user.id,
                     },
                  },
               },
            },
         }),
   }),
}));
