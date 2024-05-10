import { db } from '@db/index';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest): Promise<Response> {
  const data = await request.json();
  const { name } = data;

  if (!name)
    return Response.json(
      { error: 'Надайте, будь ласка, всю інформацію.' },
      { status: 400 }
    );

  const res = await db.city.create({
    data: { name },
  });
  return Response.json(res);
}

export async function GET(): Promise<Response> {
  const res = await db.city.findMany();
  return Response.json(res);
}
