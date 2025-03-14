import { PrismaClient, GadgetStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const gadgets = await prisma.gadget.createMany({
    data: [
      {
        name: 'Laser Gun',
        codename: 'The Kraken',
        missionSuccessProbability: 85,
        status: GadgetStatus.Available,
      },
      {
        name: 'Night Vision Goggles',
        codename: 'The Nightingale',
        missionSuccessProbability: 92,
        status: GadgetStatus.Deployed,
      },
      {
        name: 'Smoke Grenade',
        codename: 'The Phantom',
        missionSuccessProbability: 77,
        status: GadgetStatus.Destroyed,
      },
      {
        name: 'Explosive Device',
        codename: 'The Titan',
        missionSuccessProbability: 63,
        status: GadgetStatus.Decommissioned,
      },
    ],
  });

  console.log('Seed data added:', gadgets);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
