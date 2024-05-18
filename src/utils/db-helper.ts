'use server';
import { db } from '@db/index';
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
