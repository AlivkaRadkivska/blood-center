import { db } from '@db/index';
import { error } from 'console';
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
  const id: string = params.id;
  const data = await request.json();

  const res = await db.city.update({
    data,
    where: { id },
  });

  if (!res)
    return Response.json({ error: 'Місто не знайдено.' }, { status: 404 });
  return Response.json(res);
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
): Promise<Response> {
  const id: string = params.id;

  const donationLocations = await db.donationLocations.findMany({
    where: { cityId: id },
  });
  if (donationLocations.length > 0)
    return Response.json(
      { error: 'Це місто не може бути видалене.' },
      { status: 400 }
    );

  const res = await db.city.delete({ where: { id } });
  return Response.json(res);
}
