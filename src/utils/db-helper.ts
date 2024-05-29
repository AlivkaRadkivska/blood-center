'use server';
import { db } from '@db/index';
import { Prisma } from '@prisma/client';

interface ErrorMessagesT {
  notFoundError?: string;
  uniqueConstraintError?: string;
  foreignKeyConstraintError?: string;
}

export async function handleDBRequest(
  request: () => Promise<Response>,
  {
    notFoundError,
    uniqueConstraintError,
    foreignKeyConstraintError,
  }: ErrorMessagesT
): Promise<Response> {
  try {
    return await request();
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2025')
      return Response.json(
        { error: notFoundError ? notFoundError : 'Не знайдено.' },
        { status: 404 }
      );
    else if (
      e instanceof Prisma.PrismaClientKnownRequestError &&
      e.code === 'P2002'
    )
      return Response.json(
        {
          error: uniqueConstraintError
            ? uniqueConstraintError
            : 'Певне поле має бути унікальним.',
        },
        { status: 400 }
      );
    else if (
      e instanceof Prisma.PrismaClientKnownRequestError &&
      e.code === 'P2003'
    )
      return Response.json(
        {
          error: foreignKeyConstraintError
            ? foreignKeyConstraintError
            : 'Помилка сумісності з іншими таблицями.',
        },
        { status: 400 }
      );
    else {
      console.log(e);
      return Response.json({ error: 'Щось пішло не так.' }, { status: 500 });
    }
  }
}

export async function getDBRowsNumber(
  tableName: string,
  where: {},
  limit: number
): Promise<number | { error: string }> {
  try {
    switch (tableName) {
      case 'article':
        return db.article
          .count(where)
          .then((res: number) => Math.ceil(res / limit));
      case 'city':
        return db.city
          .count(where)
          .then((res: number) => Math.ceil(res / limit));
      case 'bloodNeeds':
        return db.bloodNeeds
          .count(where)
          .then((res: number) => Math.ceil(res / limit));
      case 'question':
        return db.question
          .count(where)
          .then((res: number) => Math.ceil(res / limit));
      case 'donationLocation':
        return db.donationLocation
          .count(where)
          .then((res: number) => Math.ceil(res / limit));
      default:
        return { error: 'Таблицю не знайдено.' };
    }
  } catch (e) {
    console.log(e);
    return { error: 'Щось пішло не так.' };
  }
}
