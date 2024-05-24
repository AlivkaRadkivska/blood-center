import { validateUser } from '@/utils/auth-helper';
import { getAuth } from '@clerk/nextjs/server';
import { db } from '@db/index';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest): Promise<Response> {
  const { userId } = getAuth(request);
  if (!(await validateUser(userId)))
    return Response.json({ error: 'Доступ заборонено.', status: 401 });

  const data = await request.formData();
  const name = data.get('name') as unknown as string;

  if (!name)
    return Response.json(
      { error: 'Надайте, будь ласка, всю інформацію.' },
      { status: 400 }
    );

  const city = await db.city.findUnique({ where: { name } });
  if (city)
    return Response.json(
      { error: 'Місто з такою назвою вже існує.' },
      { status: 400 }
    );

  const res = await db.city.create({
    data: { name },
  });

  return Response.json(res);
}

export async function GET(request: NextRequest): Promise<Response> {
  const url = request.nextUrl.searchParams;
  const search = url.get('search');

  const res = await db.city.findMany({
    where: { name: { contains: search ? search : '', mode: 'insensitive' } },
  });
  return Response.json(res);
}
