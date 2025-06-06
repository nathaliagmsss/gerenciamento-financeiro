import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Cria um cliente
  const cliente = await prisma.cliente.create({
    data: {
      nome: 'Maria Silva',
      email: 'maria@example.com',
      status: true,
    },
  });

  // Cria um asset vinculado a esse cliente
  const asset = await prisma.asset.create({
    data: {
      name: 'Ação XPTO',
      value: 5000.75,
      clientId: cliente.id,
    },
  });

  console.log('Cliente criado:', cliente);
  console.log('Asset criado:', asset);
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
  });