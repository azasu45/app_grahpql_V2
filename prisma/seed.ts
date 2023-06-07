import { PrismaClient } from '@prisma/client';
import dataPrimary from './demo-data.json';
import perfilesJSON from './data/Perfil.json';
import cuentasJSON from './data/Cuenta.json';
import gruposJSON from './data/Grupo.json';
import participantesJSON from './data/Participante.json';
import cobrosJSON from './data/Cobro.json';
import pagosJSON from './data/Pago.json';

const prisma = new PrismaClient();

async function main() {
   await createPerfiles();
   await createAccounts();
   await createGroups();
   await createParticipants();
   await createCharge();
   await createPayments();
}

async function createPerfiles() {
   await prisma.perfil.deleteMany();

   for (let data of perfilesJSON) {
      await prisma.perfil.create({
         data,
      });
   }
}

async function createAccounts() {
   await prisma.cuenta.deleteMany();
   for (let data of cuentasJSON) {
      await prisma.cuenta.create({
         data,
      });
   }
}

async function createGroups() {
   await prisma.grupo.deleteMany();
   for (let data of gruposJSON) {
      await prisma.grupo.create({
         data,
      });
   }
}

async function createParticipants() {
   await prisma.participante.deleteMany();
   // for (let data of participantesJSON) {
   //    await prisma.participante.create({
   //       data,
   //    });
   // }

   for (let data of participantesJSON) {
      const participante = dataPrimary.participante.filter(
         (participante) => participante.nombre === data.nombre
      );

      const perfil = dataPrimary.perfil.filter(
         (perfil) => perfil.id === participante[0].perfilId
      );

      const perfilData = perfilesJSON.filter(
         (perfilD) => perfilD.subName === perfil[0].nombre
      );

      await prisma.participante.create({
         data: {
            ...data,
            perfilId: perfilData[0].id,
         },
      });
   }
}

async function createCharge() {
   await prisma.cobro.deleteMany();
   for (let data of cobrosJSON) {
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
   for (let data of pagosJSON) {
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
