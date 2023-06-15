import { builder, orderBy } from "../builder";
import { prismaYoga } from "../db";

const DEFAULT_PAGE_SIZE = 10;

builder.prismaNode("Pago", {
  id: { field: "id" },
  fields: (t) => ({
    referencia: t.exposeString("referencia"),
    captureImg: t.exposeString("captureImg"),
    refAdmin: t.exposeString("refAdmin"),
    estado: t.exposeInt("estado"),
    observacion: t.exposeString("Observacion"),
    monto: t.field({
      type: "Decimal",
      resolve: (pago) => pago.monto,
    }),
    fecha: t.field({
      type: "DateTime",
      resolve: (pago) => pago.fecha,
    }),
    cobro: t.relation("cobro"),
    grupo: t.relation("grupo"),
    perfilPago: t.relation("perfilPago"),
    perfilSuscrito: t.relation("perfilSuscrito"),
  }),
});

/* Pagos con grupos */
/* Pagos con cobros */

/* Fecha */

builder.queryFields((t) => ({
  pagos: t.prismaField({
    type: ["Pago"],
    args: {
      take: t.arg.int(),
      skip: t.arg.int(),
      orderByFecha: t.arg.boolean(),
    },
    resolve: async (async, _, args, ctx) => {
      const user = ctx.session.user;
      return await prismaYoga.pago.findMany({
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
          fecha: args.orderByFecha ? "asc" : "desc",
        },
      });
    },
  }),

  pagosCount: t.field({
    type: "Int",
    resolve: async (root, args, ctx) =>
      await prismaYoga.pago.count({
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
