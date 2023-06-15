import { PrismaClient } from "@prisma/client";
import cobroJSON from "./data_3/Cobro.json";
import perfilJSON from "./data_3/Perfil.json";
import grupoJSON from "./data_3/Grupo.json";
import pagoJSON from "./data_3/Pago.json";
import data from "./data_3/demo-data.json";
const prisma = new PrismaClient();

async function main() {
  await createPerfiles();
  await createGroups();
  await createCharge();
  await createPayments();
}

async function createPerfiles() {
  await prisma.perfil.deleteMany();

  for (let data of perfilJSON) {
    const { cedula, id, subName, userId } = data;

    await prisma.perfil.create({
      data: {
        id,
        cedula,
        nombre: subName,
        userId,
      },
    });
  }
}

async function createGroups() {
  await prisma.grupo.deleteMany();

  for (let data of grupoJSON) {
    await prisma.grupo.create({
      data,
    });
  }
}

async function createCharge() {
  await prisma.cobro.deleteMany();
  for (let data of cobroJSON) {
    const fecha = new Date(data.fecha);

    await prisma.cobro.create({
      data: {
        ...data,
        fecha,
      },
    });
  }
}

async function createPayments() {
  await prisma.pago.deleteMany();
  for (let data of pagoJSON) {
    const {
      captureImg,
      cobroId,
      grupoId,
      id,
      monto,
      perfilId,
      suscritoId,
      referencia,
    } = data;

    const fecha = new Date(data.fecha);

    await prisma.pago.create({
      data: {
        captureImg,
        estado: 1,
        refAdmin: "",
        Observacion: "123",
        cobroId,
        perfilId,
        suscritoId,
        referencia: referencia.toString(),
        monto,
        fecha,
        grupoId,
        id,
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
