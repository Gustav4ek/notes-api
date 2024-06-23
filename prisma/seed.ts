import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  const userCount = 100;
  const notesPerUser = 10;

  for (let i = 0; i < userCount; i++) {
    const user = await prisma.user.create({
      data: {
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
      },
    });

    const notesData = [];
    for (let j = 0; j < notesPerUser; j++) {
      notesData.push({
        title: faker.lorem.sentence(),
        description: faker.lorem.paragraph(),
        tags: faker.lorem.words(3).split(' '),
        location: faker.location.city(),
        userId: user.id,
      });
    }

    await prisma.note.createMany({
      data: notesData,
    });

    console.log(`Created user ${user.username} with ${notesPerUser} notes.`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });