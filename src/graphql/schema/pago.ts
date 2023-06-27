import { decodeGlobalID } from '@pothos/plugin-relay';
import { builder, orderBy } from '../builder';
import { prisma } from '../db';

const DEFAULT_PAGE_SIZE = 10;

builder.prismaNode('Pago', {
   id: { field: 'id' },
   fields: (t) => ({
      referencia: t.exposeString('referencia'),
      captureImg: t.exposeString('captureImg'),
      refAdmin: t.exposeString('refAdmin', { nullable: true }),
      estado: t.exposeInt('estado'),
      observacion: t.exposeString('observacion', { nullable: true }),
      monto: t.field({
         type: 'Decimal',
         resolve: (pago) => pago.monto,
      }),
      fecha: t.field({
         type: 'DateTime',
         resolve: (pago) => pago.fecha,
      }),
      cobro: t.relation('cobro', { nullable: true }),
      grupo: t.relation('grupo', { nullable: true }),
      perfilPago: t.relation('perfilPago'),
      perfilSuscrito: t.relation('perfilSuscrito'),
   }),
});

/* Pagos con grupos */
/* Pagos con cobros */

/* Fecha */

builder.queryFields((t) => ({
   misPagos: t.prismaField({
      type: ['Pago'],
      args: {
         take: t.arg.int(),
         skip: t.arg.int(),
         orderByFecha: t.arg.boolean(),
      },
      resolve: async (query, _, args, ctx) => {
         const { user } = ctx.session;
         return await prisma.pago.findMany({
            ...query,
            where: {
               perfilPago: {
                  userId: user.id,
               },
            },
            skip: args?.skip ?? 0,
            take: args?.take ?? DEFAULT_PAGE_SIZE,
            orderBy: {
               fecha: args.orderByFecha ? 'desc' : 'asc',
            },
         });
      },
   }),

   pagos: t.prismaField({
      type: ['Pago'],
      args: {
         take: t.arg.int(),
         skip: t.arg.int(),
         orderByFecha: t.arg.boolean(),
      },
      resolve: async (async, _, args, ctx) => {
         const user = ctx.session.user;
         return await prisma.pago.findMany({
            take: args.take ?? DEFAULT_PAGE_SIZE,
            skip: args.skip ?? 0,
            where: {
               cobro: {
                  perfil: {
                     userId: user.id,
                  },
               },
            },
            include: {
               cobro: true,
            },
            orderBy: {
               fecha: args.orderByFecha ? 'asc' : 'desc',
            },
         });
      },
   }),

   pagosCount: t.field({
      type: 'Int',
      resolve: async (root, args, ctx) =>
         await prisma.pago.count({
            where: {
               cobro: {
                  perfil: {
                     userId: ctx.session.user.id,
                  },
               },
            },
         }),
   }),
}));

const createPagoInput = builder.inputType('createPagoInput', {
   fields: (t) => ({
      perfilId: t.string({ required: true }),
      cobroId: t.string(),
      grupoId: t.string(),
      monto: t.field({
         type: 'Decimal',
         required: true,
      }),
      referencia: t.string({ required: true }),
      captureImg: t.string({ required: true }),
      observacion: t.string(),
   }),
});

builder.mutationFields((t) => ({
   crearPago: t.prismaField({
      type: 'Pago',
      nullable: true,
      args: {
         input: t.arg({ type: createPagoInput, required: true }),
      },
      resolve: async (query, _, args, ctx) => {
         const { user } = ctx.session;

         const perfil = await prisma.perfil.findUnique({
            where: {
               userId: user.id,
            },
         });

         if (!perfil) return null;

         return await prisma.pago.create({
            data: {
               estado: 1,
               referencia: args.input.referencia,
               observacion: args.input.observacion,
               monto: args.input.monto,
               suscritoId: user.id,
               perfilId: decodeGlobalID(perfil.id).id,
               captureImg: args.input.captureImg,
            },
         });
      },
   }),
}));
