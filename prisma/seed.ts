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
        title: "Важлива роль донорства крові в охороні здоров'я",
        photo: 'img.jpg',
        author: 'ChatGPT',
        description:
          "У цій статті розглядається важливий вплив донорства крові на систему охорони здоров'я, висвітлюються його переваги, процес залучення донорів та виклики, що постають перед стимулюванням більшої кількості донорів.",
        content:
          "<p>Донорство крові є наріжним каменем сучасної охорони здоров'я, забезпечуючи життєво важливу підтримку безлічі пацієнтів по всьому світу. Незважаючи на його критичне значення, багато людей залишаються не поінформованими про численні переваги та простоту процесу донорства. У цій статті розглядається, чому донорство крові є необхідним, як воно працює, та які виклики виникають у залученні донорів.</p>",
        active: true,
      },
    ],
  });

  await db.question.createMany({
    data: [
      {
        email: 'smbd@mail.com',
        question: 'Зі скілької років я можу бути донором крові?',
        answer:
          'Донором крові може будь-яка здорова людина віком від 18 років.',
        active: true,
      },
      {
        email: 'smbd@mail.com',
        question: 'Скільки годин не їсти перед здачею крові?',
        answer:
          'Перед здачею крові не можна нічого їсти протягом як мінімум 8 годин.',
        active: true,
      },
      {
        email: 'smbd@mail.com',
        question: 'Чи боляче здавати кров?',
        answer: 'Ні.',
        active: false,
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
