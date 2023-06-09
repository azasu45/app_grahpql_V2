import { PrismaClient } from '@prisma/client';
import data from './data_2/demo-data.json';
const prisma = new PrismaClient();

async function main() {
   await createPerfiles();
   await createGroups();
   await createCharge();
}

async function createPerfiles() {
   await prisma.perfil.deleteMany();

   for (let p of data.perfil) {
      await prisma.perfil.create({
         data: {
            ...p,
         },
      });
   }
}

async function createGroups() {
   await prisma.grupo.deleteMany();
   for (let d of data.grupo) {
      await prisma.grupo.create({
         data: {
            nombre: d.nombre,
            id: d.id,
            orden: d.orden,
            perfilId: d.perfilId,
         },
      });
   }
}

async function createCharge() {
   await prisma.cobro.deleteMany();
   for (let o of data.cobro) {
      const fecha = new Date(o.fecha);

      await prisma.cobro.create({
         data: {
            descripcion: o.descripcion,
            monto: o.monto,
            perfilId: o.perfilId,
            fecha,
         },
      });
   }
}

// async function createPayments() {
//    await prisma.pago.deleteMany();
//    for (let data of pagosJSON) {
//       const fecha = nb          ew Date(data.fecha);
//       await prisma.pago.create({
//          data: {
//             ...data,
//             fecha,
//          },
//       });
//    }
// }

main()
   .then(async () => {
      await prisma.$disconnect();
   })
   .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
   });
