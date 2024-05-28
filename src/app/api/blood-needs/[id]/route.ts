import { validateUser } from '@/utils/auth-helper';
import { handleDBRequest } from '@/utils/db-helper';
import { db } from '@db/index';
import { NextRequest } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<Response> {
  const dbRequest = async () => {
    const id: string = params.id;
    const url = request.nextUrl.searchParams;
    const cityId = url.get('cityId');

    if (cityId) {
      const res = await db.bloodNeeds.findUnique({
        where: { cityId },
        include: { city: true },
      });
      return Response.json(res);
    }

    const res = await db.bloodNeeds.findUnique({
      where: { id },
      include: { city: true },
    });
    return Response.json(res);
  };

  return handleDBRequest(dbRequest, {
    notFoundError: 'Потреби у крові не знайдено.',
  });
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<Response> {
  if (!(await validateUser(request)))
    return Response.json({ error: 'Доступ заборонено.', status: 401 });

  const dbRequest = async () => {
    const id: string = params.id;
    const url = await request.formData();
    const bloodTypesStr = url.get('bloodTypes') as string;
    const cityId = url.get('city') as string;
    const bloodTypes = bloodTypesStr.replace(' ', '').split(',');
    if (!cityId || !bloodTypes || !cityId)
      return Response.json(
        { error: 'Надайте, будь ласка, всю інформацію.' },
        { status: 400 }
      );

    const res = await db.bloodNeeds.update({
      data: { cityId, bloodTypes, lastUpdate: new Date(Date.now()) },
      where: { id },
    });
    return Response.json(res);
  };

  return handleDBRequest(dbRequest, {
    notFoundError: 'Потреби у крові не знайдено.',
    uniqueConstraintError:
      'Дані про потреби у крові в цьому місті вже є в базі.',
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

    const res = await db.bloodNeeds.delete({ where: { id } });
    return Response.json(res);
  };

  return handleDBRequest(dbRequest, {
    notFoundError: 'Потреби у крові не знайдено.',
  });
}
