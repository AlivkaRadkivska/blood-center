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

export async function GET(): Promise<Response> {
  const res = await db.article.findMany();
  return Response.json(res);
}
