import { decodeGlobalID } from '@pothos/plugin-relay';
import { builder } from '../builder';
import { prisma } from '../db';
import fs from 'fs';
import path from 'path';
import { addDays } from '../../libs/function';
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

const InputFiltrosPagos = builder.inputType('InputFiltrosPagos', {
  fields: (t) => ({
    referencia: t.string({ required: false }),
    fechaDesde: t.string({ required: false }),
    fechaHasta: t.string({ required: false }),
  }),
});

builder.queryFields((t) => ({
  misPagosRecibidos: t.prismaField({
    type: ['Pago'],
    args: {
      take: t.arg.int(),
      skip: t.arg.int(),
      filtros: t.arg({ type: InputFiltrosPagos, required: false }),
      orderByFecha: t.arg.boolean(),
    },
    resolve: async (query, _, args, ctx) => {
      const { user } = ctx.session;
      return await prisma.pago.findMany({
        ...query,
        skip: args?.skip ?? 0,
        take: args?.take ?? DEFAULT_PAGE_SIZE,
        where: {
          perfilPago: {
            userId: user.id,
          },
          referencia: {
            contains: args.filtros?.referencia ?? undefined,
            mode: 'insensitive',
          },
          fecha: {
            gte: args.filtros?.fechaDesde ? new Date(args.filtros?.fechaDesde) : undefined,
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
        orderBy: {
          fecha: args.orderByFecha ? 'desc' : 'asc',
        },
      });
    },
  }),

  misPagosRecibidosCount: t.field({
    type: 'Int',
    resolve: async (query, args, ctx) => {
      const { user } = ctx.session;
      return await prisma.pago.count({
        ...query,
        where: {
          perfilPago: {
            userId: user.id,
          },
        },
      });
    },
  }),

  misPagosRealizados: t.prismaField({
    type: ['Pago'],
    args: {
      take: t.arg.int(),
      skip: t.arg.int(),
      filtros: t.arg({ type: InputFiltrosPagos, required: false }),
    },
    resolve: async (query, _, args, ctx) => {
      const user = ctx.session.user;
      return await prisma.pago.findMany({
        take: args.take ?? DEFAULT_PAGE_SIZE,
        skip: args.skip ?? 0,
        where: {
          perfilSuscrito: {
            userId: user.id,
          },
          referencia: {
            contains: args.filtros?.referencia ?? undefined,
            mode: 'insensitive',
          },
          fecha: {
            gte: args.filtros?.fechaDesde ? new Date(args.filtros?.fechaDesde) : undefined,
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
          cobro: true,
        },
        orderBy: [
          {
            fecha: 'desc',
          },
        ],
      });
    },
  }),

  misPagosRealizadosCount: t.field({
    type: 'Int',
    args: {
      take: t.arg.int(),
      skip: t.arg.int(),
      filtros: t.arg({ type: InputFiltrosPagos, required: false }),
    },
    resolve: async (query, args, ctx) => {
      const user = ctx.session.user;
      return await prisma.pago.count({
        where: {
          perfilSuscrito: {
            userId: user.id,
          },
          fecha: {
            gte: args.filtros?.fechaDesde ? new Date(args.filtros?.fechaDesde) : undefined,
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
      });
    },
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
          suscritoId: perfil.id,
          perfilId: decodeGlobalID(args.input.perfilId).id,
          captureImg: args.input.captureImg,
        },
      });
    },
  }),

  uploadFile: t.field({
    type: 'Boolean',
    nullable: true,
    args: {
      file: t.arg({ type: 'File', required: true }),
    },
    resolve: async (_, args, ctx) => {
      try {
        console.log(args);
        const fileArrayBuffer = await args.file.arrayBuffer();
        await fs.promises.writeFile(
          path.join(__dirname, args.file.name),
          Buffer.from(fileArrayBuffer)
        );
      } catch (e) {
        console.error(e);
        return false;
      }
      return true;
    },
  }),
}));
