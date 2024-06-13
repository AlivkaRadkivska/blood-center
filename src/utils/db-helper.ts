'use server';
import { db } from '@db/index';
import { Prisma } from '@prisma/client';
import { URLSearchParams } from 'url';

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

export async function getPaginationOptions(
  url: URLSearchParams
): Promise<{ take?: number; skip?: number }> {
  const take = Number(url.get('take') as unknown) || 5;
  const page = Number(url.get('page') as unknown);

  return page
    ? {
        take: take,
        skip: (page - 1) * take,
      }
    : {};
}

export async function getSearchParams(
  search: string | undefined,
  args: string[]
) {
  if (search && search.length > 0) {
    let OR: {}[] = [];

    args.map((arg) => {
      const keys = arg.split('.');
      let obj: { [k: string]: any } = {};
      let nestedObj = obj;

      for (let i = 0; i < keys.length - 1; i++) {
        nestedObj[keys[i]] = {};
        nestedObj = nestedObj[keys[i]];
      }

      nestedObj[keys[keys.length - 1]] = {
        contains: search,
        mode: 'insensitive',
      };

      OR.push(obj);
    });

    return { OR };
  }

  return {};
}

export async function getArticleNumber(
  limit: number,
  whereParams: {
    active?: boolean;
    search?: string;
  }
): Promise<number> {
  return await db.article
    .count({
      where: {
        active: whereParams.active,
        ...(await getSearchParams(whereParams.search, ['title', 'content'])),
      },
    })
    .then((res) => Math.ceil(res / limit));
}

export async function getCityNumber(
  limit: number,
  whereParams: {
    active?: boolean;
    search?: string;
  }
): Promise<number> {
  return await db.city
    .count({
      where: {
        ...(await getSearchParams(whereParams.search, ['name'])),
      },
    })
    .then((res) => Math.ceil(res / limit));
}

export async function getLocationNumber(
  limit: number,
  whereParams: {
    active?: boolean;
    search?: string;
    cityId?: string;
  }
): Promise<number> {
  return await db.donationLocation
    .count({
      where: {
        ...(await getSearchParams(whereParams.search, [
          'address',
          'city.name',
        ])),
        cityId: whereParams.cityId ? whereParams.cityId : undefined,
      },
    })
    .then((res) => Math.ceil(res / limit));
}

export async function getBloodNeedsNumber(
  limit: number,
  whereParams: {
    active?: boolean;
    search?: string;
  }
): Promise<number> {
  return await db.bloodNeeds
    .count({
      where: {
        OR: [
          {
            bloodTypes: {
              has: whereParams.search ? whereParams.search : '',
            },
          },
          {
            city: {
              name: {
                contains: whereParams.search ? whereParams.search : '',
                mode: 'insensitive',
              },
            },
          },
        ],
      },
    })
    .then((res) => Math.ceil(res / limit));
}

export async function getQuestionNumber(
  limit: number,
  whereParams: {
    active?: boolean;
    search?: string;
  }
): Promise<number> {
  return await db.question
    .count({
      where: {
        active: whereParams.active,
        ...(await getSearchParams(whereParams.search, ['question', 'answer'])),
      },
    })
    .then((res) => Math.ceil(res / limit));
}
