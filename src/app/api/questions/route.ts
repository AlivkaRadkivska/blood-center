import { db } from '@db/index';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest): Promise<Response> {
  const data = await request.formData();
  const question = data.get('question') as unknown as string;

  if (!question)
    return Response.json(
      { error: 'Ви не поставили жодного запитання.' },
      { status: 400 }
    );

  const res = await db.question.create({
    data: { question },
  });
  return Response.json(res);
}

export async function GET(request: NextRequest): Promise<Response> {
  const url = request.nextUrl.searchParams;
  const active = Boolean(url.get('active') as unknown);
  if (active) {
    const res = await db.question.findMany({ where: { active } });
    return Response.json(res);
  }

  const res = await db.question.findMany();
  return Response.json(res);
}
