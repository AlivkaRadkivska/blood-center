import { validateUser } from '@/utils/auth-helper';
import {
  handleDBRequest,
  getPaginationOptions,
  getSearchParams,
} from '@/utils/db-helper';
import { db } from '@db/index';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest): Promise<Response> {
  if (!(await validateUser(request)))
    return Response.json({ error: 'Доступ заборонено.', status: 401 });

  const dbRequest = async () => {
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

    const res = await db.donationLocation.create({
      data: { institution, address, phone, openedAt, url: locationUrl, cityId },
    });
    return Response.json(res);
  };

  return handleDBRequest(dbRequest, {});
}

export async function GET(request: NextRequest): Promise<Response> {
  const dbRequest = async () => {
    const url = request.nextUrl.searchParams;
    const cityId = url.get('cityId');

    if (cityId) {
      const res = await db.donationLocation.findMany({
        ...(await getPaginationOptions(url)),
        where: {
          cityId,
        },
      });
      return Response.json(res);
    }

    const res = await db.donationLocation.findMany({
      ...(await getPaginationOptions(url)),
      where: {
        ...(await getSearchParams(url.get('search') as string, [
          'address',
          'city.name',
        ])),
      },
      include: {
        city: true,
      },
    });
    return Response.json(res);
  };

  return handleDBRequest(dbRequest, {
    notFoundError: 'Пунктів прийому крові не знайдено.',
  });
}
