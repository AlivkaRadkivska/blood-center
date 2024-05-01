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

  const res = await db.donationLocations.create({
    data: { address, url, cityId },
  });
  return Response.json(res);
}

export async function GET(): Promise<Response> {
  const res = await db.donationLocations.findMany();
  return Response.json(res);
}
