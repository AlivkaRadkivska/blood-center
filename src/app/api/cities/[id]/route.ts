import { validateUser } from '@/utils/auth-helper';
import { getAuth } from '@clerk/nextjs/server';
import { db } from '@db/index';
import { NextRequest } from 'next/server';

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
): Promise<Response> {
  const id: string = params.id;

  const res = await db.city.findUnique({ where: { id } });
  if (!res)
    return Response.json({ error: 'Місто не знайдено.' }, { status: 404 });

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
  const data = await request.formData();
  const name = data.get('name') as unknown as string;

  const city = await db.city.findUnique({ where: { name } });
  if (city)
    return Response.json(
      { error: 'Місто з такою назвою вже існує.' },
      { status: 400 }
    );

  const res = await db.city.update({
    data: { name },
    where: { id },
  });

  if (!res)
    return Response.json({ error: 'Місто не знайдено.' }, { status: 404 });
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

  const donationLocation = await db.donationLocation.findFirst({
    where: { cityId: id },
  });
  const bloodNeeds = await db.bloodNeeds.findFirst({
    where: { cityId: id },
  });
  if (donationLocation || bloodNeeds)
    return Response.json(
      { error: 'Це місто не може бути видалене.' },
      { status: 400 }
    );

  const res = await db.city.delete({ where: { id } });
  return Response.json(res);
}
