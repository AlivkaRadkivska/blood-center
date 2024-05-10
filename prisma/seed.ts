const { PrismaClient } = require('@prisma/client');

const db = new PrismaClient();

async function main() {
  await db.article.deleteMany();
  await db.question.deleteMany();
  await db.donationLocation.deleteMany();
  await db.bloodNeeds.deleteMany();
  await db.city.deleteMany();

  await db.article.createMany({
    data: [
      {
        title: 'Заголовок статті 1',
        photo: 'https://example.com/image1.jpg',
        content: 'Це контент до статті 1.',
        active: true,
      },
      {
        title: 'Заголовок статті 2',
        photo: 'https://example.com/image2.jpg',
        content: 'Це контент до статті 2.',
        active: false,
      },
    ],
  });

  await db.question.createMany({
    data: [
      {
        question: 'Питання 1',
        answer: 'Складна відповідь',
        active: true,
      },
      {
        question: 'Питання 2',
        answer: 'Проста відповідь',
        active: true,
      },
    ],
  });

  const city = await db.city.create({
    data: {
      name: 'Житомир',
    },
  });

  await db.donationLocation.createMany({
    data: [
      {
        address: 'Вул. Один, 2',
        cityId: city.id,
        url: 'https://example.com/donate-location1',
      },
      {
        address: 'Вул. Два, 1',
        url: 'https://example.com/donate-location2',
        cityId: city.id,
      },
    ],
  });

  await db.bloodNeeds.createMany({
    data: [
      {
        lastUpdate: new Date(Date.now()),
        bloodTypes: ['1-', '2+', '4+'],
        cityId: city.id,
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
