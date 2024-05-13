import { db } from '@db/index';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest): Promise<Response> {
  const data = await request.json();
  const { bloodTypes, cityId } = data;

  if (!bloodTypes || !cityId)
    return Response.json(
      { error: 'Надайте, будь ласка, всю інформацію.' },
      { status: 400 }
    );

  const bloodNeed = await db.bloodNeeds.findUnique({ where: { cityId } });
  if (bloodNeed)
    return Response.json(
      { error: 'Дані про потреби у крові в цьому місті вже є в базі.' },
      { status: 400 }
    );

  const res = await db.bloodNeeds.create({
    data: { bloodTypes, cityId },
  });
  return Response.json(res);
}

export async function GET(request: NextRequest): Promise<Response> {
  const url = request.nextUrl.searchParams;
  const cityId = url.get('cityId');

  if (cityId) {
    console.log(cityId);
  }

  const res = await db.bloodNeeds.findMany();
  return Response.json(res);
}
