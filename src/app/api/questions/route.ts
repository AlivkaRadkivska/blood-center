import {
  handleDBRequest,
  getPaginationOptions,
  getSearchParams,
} from '@/utils/db-helper';
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
    const active = (url.get('active') as unknown) == 'true' || undefined;

    const res = await db.question.findMany({
      ...(await getPaginationOptions(url)),
      where: {
        active,
        ...(await getSearchParams(url.get('search') as string, [
          'question',
          'answer',
        ])),
      },
    });
    return Response.json(res);
  };

  return handleDBRequest(dbRequest, { notFoundError: 'Питання не знайдені.' });
}
