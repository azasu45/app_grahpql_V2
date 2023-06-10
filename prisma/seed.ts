import { PrismaClient } from "@prisma/client";
import cobroJSON from "./data_2/Cobro.json";
import perfilJSON from "./data_2/Perfil.json";
import grupoJSON from "./data_2/Grupo.json";
import pagoJSON from "./data_2/Pago.json";
import data from "./data_2/demo-data.json";
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
    await prisma.perfil.create({
      data,
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
    const fecha = new Date(data.fecha);
    await prisma.pago.create({
      data: {
        ...data,
        fecha,
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
