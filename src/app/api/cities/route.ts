import { validateUser } from '@/utils/auth-helper';
import {
  handleDBRequest,
  getPaginationOptions,
  getSearchParams,
} from '@/utils/db-helper';
import { db } from '@db/index';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest): Promise<Response> {
  if (!(await validateUser(request)))
    return Response.json({ error: 'Доступ заборонено.', status: 401 });

  const dbRequest = async () => {
    const data = await request.formData();
    const name = data.get('name') as string;
    if (!name)
      return Response.json(
        { error: 'Надайте, будь ласка, всю інформацію.' },
        { status: 400 }
      );

    const res = await db.city.create({
      data: { name },
    });

    return Response.json(res);
  };

  return handleDBRequest(dbRequest, {
    uniqueConstraintError: 'Місто з такою назвою вже існує.',
  });
}

export async function GET(request: NextRequest): Promise<Response> {
  const dbRequest = async () => {
    const url = request.nextUrl.searchParams;

    const res = await db.city.findMany({
      ...(await getPaginationOptions(url)),
      where: {
        ...(await getSearchParams(url.get('search') as string, ['name'])),
      },
    });
    return Response.json(res);
  };
  return handleDBRequest(dbRequest, { notFoundError: 'Міст не знайдено.' });
}
