import { builder } from '../builder';
import { prisma } from '../db';

builder.prismaNode('Perfil', {
   id: { field: 'id' },
   fields: (t) => ({
      userId: t.expose('userId', { type: 'ID', nullable: true }),
      nombre: t.exposeString('nombre'),
      cedula: t.exposeString('cedula'),
   }),
});

builder.queryFields((t) => ({
   perfiles: t.prismaField({
      type: ['Perfil'],
      resolve: async (query, _, { id }, ctx) => await prisma.perfil.findMany(),
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
         const user = ctx.session.user;

         return await prisma.perfil.upsert({
            ...query,
            where: {
               cedula: input.cedula,
            },
            create: {
               userId: user.id,
               nombre: input.nombre,
               cedula: input.cedula,
            },
            update: {
               userId: user.id,
               nombre: input.nombre,
               cedula: input.cedula,
            },
         });
      },
   }),
);
