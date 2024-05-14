import { db } from '@db/index';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest): Promise<Response> {
  const data = await request.json();
  const { address, url, cityId } = data;

  if (!address || !url || !cityId)
    return Response.json(
      { error: 'Надайте, будь ласка, всю інформацію.' },
      { status: 400 }
    );

  const res = await db.donationLocation.create({
    data: { address, url, cityId },
  });
  return Response.json(res);
}

export async function GET(request: NextRequest): Promise<Response> {
  const url = request.nextUrl.searchParams;
  const cityId = url.get('cityId');

  if (cityId) {
    const res = await db.donationLocation.findMany({ where: { cityId } });
    return Response.json(res);
  }

  const res = await db.donationLocation.findMany();
  return Response.json(res);
}
