import { validateUser } from '@/utils/auth-helper';
import { getAuth } from '@clerk/nextjs/server';
import { db } from '@db/index';
import { NextRequest } from 'next/server';

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
): Promise<Response> {
  const id: string = params.id;

  const res = await db.bloodNeeds.findUnique({ where: { cityId: id } });

  if (!res)
    return Response.json(
      { error: 'Потреби у крові за цим id не знайдено.' },
      { status: 404 }
    );
  return Response.json(res);
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<Response> {
  const { userId } = getAuth(request);
  if (!(await validateUser(userId)))
    return Response.json({ error: 'Доступ заборонено.', status: 401 });

  const id: string = params.id;
  const data = await request.json();
  const { bloodTypes } = data;

  const res = await db.bloodNeeds.update({
    data: { bloodTypes, lastUpdate: new Date(Date.now()) },
    where: { id },
  });

  if (!res)
    return Response.json(
      { error: 'Потреби у крові за цим id не знайдено.' },
      { status: 404 }
    );
  return Response.json(res);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<Response> {
  const { userId } = getAuth(request);
  if (!(await validateUser(userId)))
    return Response.json({ error: 'Доступ заборонено.', status: 401 });

  const id: string = params.id;

  const res = await db.bloodNeeds.delete({ where: { id } });
  return Response.json(res);
}
