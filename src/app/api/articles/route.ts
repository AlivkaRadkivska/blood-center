import { db } from '@db/index';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest): Promise<Response> {
  const data = await request.json();
  const { title, photo, content } = data;

  if (!title || !photo || !content)
    return Response.json(
      { error: 'Надайте, будь ласка, всю інформацію.' },
      { status: 400 }
    );

  const res = await db.article.create({
    data: { title, photo, content },
  });
  return Response.json(res);
}

export async function GET(request: NextRequest): Promise<Response> {
  const url = request.nextUrl.searchParams;
  const active = (url.get('active') as unknown) == 'true' || undefined;
  const search = url.get('search') as unknown as string;
  const page = url.get('page') as unknown as number;

  const res = await db.article.findMany({
    take: 2,
    skip: page ? (page - 1) * 2 : 0,
    where: {
      active,
      title: { contains: search ? search : '', mode: 'insensitive' },
    },
  });
  return Response.json(res);
}
