import { validateUser } from '@/utils/auth-helper';
import { getAuth } from '@clerk/nextjs/server';
import { db } from '@db/index';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest): Promise<Response> {
  const { userId } = getAuth(request);
  if (!(await validateUser(userId)))
    return Response.json({ error: 'Доступ заборонено.', status: 401 });

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
    const res = await db.bloodNeeds.findMany({ where: { cityId } });
    return Response.json(res);
  }

  const res = await db.bloodNeeds.findMany();
  return Response.json(res);
}
