import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function registration() {
  const userCount = 100;
  const notesPerUser = 10;
  if (await prisma.user.count() === 0) {
    for (let i = 0; i < userCount; i++) {
      const password = await bcrypt.hash(faker.internet.password(), 7);

      const user = await prisma.user.create({
        data: {
          username: faker.internet.userName(),
          email: faker.internet.email(),
          password: password,
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
}

registration()
    .catch((e) => {
      console.error(e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });