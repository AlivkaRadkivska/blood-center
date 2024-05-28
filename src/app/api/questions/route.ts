import { handleDBRequest } from '@/utils/db-helper';
import { db } from '@db/index';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest): Promise<Response> {
  const dbRequest = async () => {
    const data = await request.formData();
    const email = data.get('email') as string;
    const question = data.get('question') as string;

    if (!question)
      return Response.json(
        { error: 'Ви не поставили жодного запитання.' },
        { status: 400 }
      );

    const res = await db.question.create({
      data: { email, question },
    });
    return Response.json(res);
  };

  return handleDBRequest(dbRequest, {});
}

export async function GET(request: NextRequest): Promise<Response> {
  const dbRequest = async () => {
    const url = request.nextUrl.searchParams;
    const active = (url.get('active') as string) === 'true';
    const search = url.get('search');
    if (active) {
      const res = await db.question.findMany({ where: { active } });
      return Response.json(res);
    }

    const res = await db.question.findMany({
      where: {
        OR: [
          {
            question: { contains: search ? search : '', mode: 'insensitive' },
          },
          {
            answer: { contains: search ? search : '', mode: 'insensitive' },
          },
        ],
      },
    });
    return Response.json(res);
  };

  return handleDBRequest(dbRequest, { notFoundError: 'Питання не знайдені.' });
}
