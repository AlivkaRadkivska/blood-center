import { db } from '@db/index';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest): Promise<Response> {
  const data = await request.json();
  const { question } = data;

  if (!question)
    return Response.json(
      { error: 'Надайте, будь ласка, всю інформацію.' },
      { status: 400 }
    );

  const res = await db.question.create({
    data: { question },
  });
  return Response.json(res);
}

export async function GET(): Promise<Response> {
  const res = await db.question.findMany();
  return Response.json(res);
}
