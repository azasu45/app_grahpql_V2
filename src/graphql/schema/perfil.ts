import { builder } from '../builder';
import { prisma } from '../db';

builder.prismaNode('Perfil', {
  id: { field: 'id' },
  fields: (t) => ({
    userId: t.expose('userId', { type: 'ID', nullable: true }),
    comercio: t.exposeString('comercio', { nullable: true }),
    nombre: t.exposeString('nombre'),
    cedula: t.exposeString('cedula'),
  }),
});

builder.queryFields((t) => ({
  perfiles: t.prismaField({
    type: ['Perfil'],
    resolve: async (query, _, { id }, ctx) => await prisma.perfil.findMany(),
  }),

  perfil: t.prismaField({
    type: 'Perfil',
    nullable: true,
    resolve: async (query, _, { id }, ctx) => {
      const { user } = ctx?.session;

      return await prisma.perfil.findUnique({
        where: {
          userId: user?.id ?? undefined,
        },
      });
    },
  }),

  buscarPerfiles: t.prismaField({
    type: ['Perfil'],
    args: {
      nombre: t.arg.string({ required: true }),
    },
    resolve: async (query, _, args, ctx) => {
      const { user } = ctx.session;
      return await prisma.perfil.findMany({
        take: 10,
        skip: 0,
        where: {
          NOT: [{ userId: user.id }],
          AND: [
            {
              nombre: {
                contains: args.nombre,
                mode: 'insensitive',
              },
            },
          ],
        },
        orderBy: {
          nombre: 'desc',
        },
      });
    },
  }),
}));

const CreateCuenta = builder.inputType('crearOActualizarPerfil', {
  fields: (t) => ({
    nombre: t.string({ required: true }),
    cedula: t.string({ required: true }),
  }),
});

builder.mutationField('crearOActualizarPerfil', (t) =>
  t.prismaField({
    type: 'Perfil',
    nullable: true,
    args: {
      input: t.arg({ type: CreateCuenta, required: true }),
    },
    resolve: async (query, _, { input }, ctx) => {
      const { user } = ctx.session;

      const perfil = await prisma.perfil.upsert({
        ...query,
        where: {
          userId: user ? user?.id : undefined,
        },
        create: {
          userId: user.id,
          nombre: input.nombre,
          cedula: input.cedula,
        },
        update: {
          nombre: input.nombre,
          cedula: input.cedula,
        },
      });

      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          complete: !!perfil ?? false,
        },
      });

      return perfil;
    },
  })
);
