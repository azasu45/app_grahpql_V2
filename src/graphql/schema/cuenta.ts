import { decodeGlobalID } from '@pothos/plugin-relay';
import { builder } from '../builder';
import { prismaYoga } from '../db';

builder.prismaNode('Cuenta', {
   id: { field: 'id' },
   fields: (t) => ({
      nombre: t.exposeString('nombre'),
      cobros: t.relation('cobros'),
      grupos: t.relation('grupo'),
      gruposCount: t.relationCount('grupo'),
      cobrosCount: t.relationCount('cobros'),
      perfil: t.relation('perfil'),
   }),
});

const DEFAULT_PAGE_SIZE = 10;

builder.queryFields((t) => ({
   cuenta: t.prismaField({
      type: 'Cuenta',
      args: { id: t.arg.string({ required: true }) },
      nullable: true,
      resolve: async (query, _, { id }, ctx) => {
         const cuentaId = decodeGlobalID(id);
         return await prismaYoga.cuenta.findUnique({
            ...query,
            where: {
               id: cuentaId.id,
            },
         });
      },
   }),

   cuentas: t.prismaField({
      type: ['Cuenta'],
      nullable: true,
      args: {
         skip: t.arg.int(),
         take: t.arg.int(),
      },
      resolve: async (query, _, args, ctx) => {
         const user = ctx.session.user;

         const count = await prismaYoga.cuenta.count();

         const cuentas = await prismaYoga.cuenta.findMany({
            ...query,
            take: args.take ?? DEFAULT_PAGE_SIZE,
            skip: args.skip ?? 0,
            where: {
               perfil: {
                  userId: user.id,
               },
            },
            include: {
               _count: {
                  select: {
                     grupo: true,
                     cobros: true,
                  },
               },
            },
         });
         return cuentas;
      },
   }),

   cuentasCount: t.field({
      type: 'Int',
      resolve: async (root, args, ctx) =>
         await prismaYoga.cuenta.count({
            where: {
               perfil: {
                  userId: ctx.session.user.id,
               },
            },
         }),
   }),
}));

const CreateCuenta = builder.inputType('crearCuenta', {
   fields: (t) => ({
      nombre: t.string({ required: true }),
   }),
});

builder.mutationField('crearCuenta', (t) =>
   t.prismaField({
      type: 'Cuenta',
      args: {
         input: t.arg({ type: CreateCuenta, required: true }),
      },
      resolve: async (query, _, { input }, ctx) => {
         const user = ctx.session.user;

         return await prismaYoga.cuenta.create({
            ...query,
            data: {
               nombre: input.nombre,
               perfil: {
                  connect: {
                     userId: user.id,
                  },
               },
            },
         });
      },
   })
);

const ActualizarCuenta = builder.inputType('actualizarCuenta', {
   fields: (t) => ({
      id: t.string({ required: true }),
      nombre: t.string({ required: true }),
   }),
});

builder.mutationField('actualizarCuenta', (t) =>
   t.prismaField({
      type: 'Cuenta',
      args: {
         input: t.arg({ type: ActualizarCuenta, required: true }),
      },
      resolve: async (query, parent, { input }, context) => {
         const cuentaId = decodeGlobalID(input.id);
         const cuenta = await prismaYoga.cuenta.update({
            where: {
               id: cuentaId.id,
            },
            data: {
               nombre: input.nombre,
            },
         });

         return cuenta;
      },
   })
);
