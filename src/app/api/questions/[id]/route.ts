import { db } from '@db/index';
import { NextRequest } from 'next/server';

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
): Promise<Response> {
  const id: string = params.id;

  const res = await db.question.findUnique({ where: { id } });

  if (!res)
    return Response.json({ error: 'Питання не знайдено.' }, { status: 404 });
  return Response.json(res);
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<Response> {
  const id: string = params.id;
  const data = await request.json();
  const { answer, active } = data;

  const res = await db.question.update({
    data: { answer, active },
    where: { id },
  });

  if (!res)
    return Response.json({ error: 'Питання не знайдено.' }, { status: 404 });
  return Response.json(res);
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
): Promise<Response> {
  const id: string = params.id;

  const res = await db.question.delete({ where: { id } });
  return Response.json(res);
}
