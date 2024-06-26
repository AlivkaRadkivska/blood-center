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
    const res = await db.donationLocation.findUnique({
      where: { id },
      include: { city: true },
    });

    return Response.json(res);
  };

  return handleDBRequest(dbRequest, {
    notFoundError: 'Пункту прийому крові не знайдено.',
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
    const institution = url.get('institution') as string;
    const address = url.get('address') as string;
    const phone = url.get('phone') as string;
    const openedAt = url.get('openedAt') as string;
    const locationUrl = url.get('url') as string;
    const cityId = url.get('city') as string;
    if (
      !institution ||
      !address ||
      !locationUrl ||
      !cityId ||
      !phone ||
      !openedAt
    )
      return Response.json(
        { error: 'Надайте, будь ласка, всю інформацію.' },
        { status: 400 }
      );

    const res = await db.donationLocation.update({
      data: { institution, address, phone, openedAt, url: locationUrl, cityId },
      where: { id },
    });
    return Response.json(res);
  };

  return handleDBRequest(dbRequest, {
    notFoundError: 'Пункту прийому крові не знайдено.',
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
    const res = await db.donationLocation.delete({ where: { id } });

    return Response.json(res);
  };

  return handleDBRequest(dbRequest, {
    notFoundError: 'Пункту прийому крові не знайдено',
  });
}
