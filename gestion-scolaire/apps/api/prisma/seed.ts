import { PrismaClient } from '@prisma/client';
import * as argon2 from 'argon2';

const prisma = new PrismaClient();

async function main() {
  const hash = await argon2.hash('admin123');
  await prisma.user.upsert({
    where: { email: 'admin@gestion-scolaire.local' },
    update: {},
    create: {
      email: 'admin@gestion-scolaire.local',
      matricule: 'ADMIN001',
      passwordHash: hash,
      firstName: 'Admin',
      lastName: 'Système',
      role: 'ADMIN',
    },
  });
  console.log('Seed terminé.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
