import { validateUser } from '@/utils/auth-helper';
import { handleDBRequest } from '@/utils/db-helper';
import { db } from '@db/index';
import { NextRequest } from 'next/server';

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
): Promise<Response> {
  const dbRequest = async () => {
    const id: string = params.id;

    const res = await db.question.findUnique({ where: { id } });
    return Response.json(res);
  };

  return handleDBRequest(dbRequest, { notFoundError: 'Питання не знайдено.' });
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<Response> {
  if (!(await validateUser(request)))
    return Response.json({ error: 'Доступ заборонено.', status: 401 });

  const dbRequest = async () => {
    const id: string = params.id;
    const data = await request.formData();
    const answer = data.get('answer') as string;
    const active = (data.get('active') as string) === 'true';

    const res = await db.question.update({
      data: { answer, active },
      where: { id },
    });
    return Response.json(res);
  };

  return handleDBRequest(dbRequest, { notFoundError: 'Питання не знайдено.' });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<Response> {
  if (!(await validateUser(request)))
    return Response.json({ error: 'Доступ заборонено.', status: 401 });

  const dbRequest = async () => {
    const id: string = params.id;

    const res = await db.question.delete({ where: { id } });
    return Response.json(res);
  };

  return handleDBRequest(dbRequest, { notFoundError: 'Питання не знайдено.' });
}
