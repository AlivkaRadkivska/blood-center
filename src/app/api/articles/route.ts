import { validateUser } from '@/utils/auth-helper';
import { handleDBRequest } from '@/utils/db-helper';
import { uploadImage } from '@/utils/file-handler';
import { db } from '@db/index';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest): Promise<Response> {
  if (!(await validateUser(request)))
    return Response.json({ error: 'Доступ заборонено.', status: 401 });

  const dbRequest = async () => {
    const data = await request.formData();
    const title = data.get('title') as string;
    const content = data.get('content') as string;
    const photoFile = data.get('photo') as unknown as File;

    const uploadingRes = await uploadImage('articles', photoFile);
    if ('message' in uploadingRes)
      return Response.json({ error: uploadingRes.message }, { status: 400 });

    if (!title || !uploadingRes || !content)
      return Response.json(
        { error: 'Надайте, будь ласка, всю інформацію.' },
        { status: 400 }
      );

    const res = await db.article.create({
      data: { title, photo: uploadingRes.imageName, content },
    });
    return Response.json(res);
  };

  return handleDBRequest(dbRequest, {});
}

export async function GET(request: NextRequest): Promise<Response> {
  const dbRequest = async () => {
    const url = request.nextUrl.searchParams;
    const active = (url.get('active') as unknown) == 'true' || undefined;
    const search = url.get('search') as string;
    const page = url.get('page') as unknown as number;

    const paginationOptions: { take?: number; skip?: number } = page
      ? {
          take: 5,
          skip: (page - 1) * 5,
        }
      : {};

    const res = await db.article.findMany({
      ...paginationOptions,
      where: {
        active,
        OR: [
          {
            title: { contains: search ? search : '', mode: 'insensitive' },
          },
          {
            content: { contains: search ? search : '', mode: 'insensitive' },
          },
        ],
      },
    });
    return Response.json(res);
  };

  return handleDBRequest(dbRequest, { notFoundError: 'Статті не знайдено.' });
}
