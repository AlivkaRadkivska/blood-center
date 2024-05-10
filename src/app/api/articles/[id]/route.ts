import { db } from '@db/index';
import { NextRequest } from 'next/server';

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
): Promise<Response> {
  const id: string = params.id;

  const res = await db.article.findUnique({ where: { id } });
  if (!res)
    return Response.json({ error: 'Статтю не знайдено.' }, { status: 404 });

  return Response.json(res);
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<Response> {
  const id: string = params.id;
  const data = await request.json();

  const res = await db.article.update({
    data,
    where: { id },
  });

  if (!res)
    return Response.json({ error: 'Статтю не знайдено.' }, { status: 404 });
  return Response.json(res);
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
): Promise<Response> {
  const id: string = params.id;

  const res = await db.article.delete({ where: { id } });
  return Response.json(res);
}
