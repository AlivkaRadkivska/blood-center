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

export async function getArticlesNumber(
  active: boolean,
  search: string,
  limit: number
) {
  const number = db.article
    .count({
      where: { active, title: { contains: search, mode: 'insensitive' } },
    })
    .then((res: number) => Math.ceil(res / limit));
  return number;
}
