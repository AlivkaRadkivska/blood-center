import { validateUser } from '@/utils/auth-helper';
import { db } from '@db/index';
import { NextRequest } from 'next/server';
import { handleDBRequest } from '@/utils/db-helper';

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
): Promise<Response> {
  const dbRequest = async () => {
    const id: string = params.id;
    const res = await db.city.findUnique({ where: { id } });

    return Response.json(res);
  };

  return handleDBRequest(dbRequest, { notFoundError: 'Місто не знайдено.' });
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
    const name = data.get('name') as string;

    const res = await db.city.update({
      data: { name },
      where: { id },
    });
    return Response.json(res);
  };

  return handleDBRequest(dbRequest, {
    notFoundError: 'Місто не знайдено.',
    uniqueConstraintError: 'Місто з такою назвою вже існує.',
  });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<Response> {
  if (!(await validateUser(request)))
    return Response.json({ error: 'Доступ заборонено.', status: 401 });

  const dbRequest = async () => {
    const id: string = params.id;

    const res = await db.city.delete({ where: { id } });
    return Response.json(res);
  };

  return handleDBRequest(dbRequest, {
    notFoundError: 'Місто не знайдене.',
    foreignKeyConstraintError: 'Це місто не може бути видалене.',
  });
}
