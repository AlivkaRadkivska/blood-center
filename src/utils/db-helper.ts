'use server';
import { db } from '@db/index';
export async function getArticlesNumber(active: boolean, search: string) {
  const number = db.article
    .count({
      where: { active, title: { contains: search, mode: 'insensitive' } },
    })
    .then((res: number) => Math.ceil(res / 2));
  return number;
}
