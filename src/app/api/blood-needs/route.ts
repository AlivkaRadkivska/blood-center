import { validateUser } from '@/utils/auth-helper';
import { handleDBRequest } from '@/utils/db-helper';
import { db } from '@db/index';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest): Promise<Response> {
  if (!(await validateUser(request)))
    return Response.json({ error: 'Доступ заборонено.', status: 401 });

  const dbRequest = async () => {
    const url = await request.formData();
    const bloodTypesStr = url.get('bloodTypes') as string;
    const cityId = url.get('city') as string;
    const bloodTypes = bloodTypesStr.replace(' ', '').split(',');
    if (!cityId || !bloodTypes || !cityId)
      return Response.json(
        { error: 'Надайте, будь ласка, всю інформацію.' },
        { status: 400 }
      );

    const res = await db.bloodNeeds.create({
      data: { bloodTypes, cityId },
    });
    return Response.json(res);
  };

  return handleDBRequest(dbRequest, {
    uniqueConstraintError:
      'Дані про потреби у крові в цьому місті вже є в базі.',
  });
}

export async function GET(request: NextRequest): Promise<Response> {
  const dbRequest = async () => {
    const url = request.nextUrl.searchParams;
    const cityId = url.get('cityId');
    const search = url.get('search');

    if (cityId) {
      const res = await db.bloodNeeds.findUnique({ where: { cityId } });
      return Response.json(res);
    }

    const res = await db.bloodNeeds.findMany({
      where: {
        OR: [
          {
            bloodTypes: { has: search ? search : '' },
          },
          {
            city: {
              name: { contains: search ? search : '', mode: 'insensitive' },
            },
          },
        ],
      },
      include: {
        city: true,
      },
    });
    return Response.json(res);
  };

  return handleDBRequest(dbRequest, {
    notFoundError: 'Потреби в крові не знайдені.',
  });
}
