import { validateUser } from '@/utils/auth-helper';
import {
  handleDBRequest,
  getPaginationOptions,
  getSearchParams,
} from '@/utils/db-helper';
import { uploadImage } from '@/utils/file-handler';
import { db } from '@db/index';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest): Promise<Response> {
  if (!(await validateUser(request)))
    return Response.json({ error: 'Доступ заборонено.', status: 401 });

  const dbRequest = async () => {
    const data = await request.formData();
    const title = data.get('title') as string;
    const description = data.get('description') as string;
    const author = data.get('author') as string;
    const content = data.get('content') as string;
    const photoFile = data.get('photo') as unknown as File;

    const uploadingRes = await uploadImage(photoFile);
    if ('message' in uploadingRes)
      return Response.json({ error: uploadingRes.message }, { status: 400 });

    if (!title || !uploadingRes || !content)
      return Response.json(
        { error: 'Надайте, будь ласка, всю інформацію.' },
        { status: 400 }
      );

    const res = await db.article.create({
      data: {
        photo: uploadingRes.imageUrl,
        title,
        author,
        description,
        content,
      },
    });
    return Response.json(res);
  };

  return handleDBRequest(dbRequest, {});
}

export async function GET(request: NextRequest): Promise<Response> {
  const dbRequest = async () => {
    const url = request.nextUrl.searchParams;
    const active = (url.get('active') as unknown) == 'true' || undefined;

    const res = await db.article.findMany({
      ...(await getPaginationOptions(url)),
      where: {
        active,
        ...(await getSearchParams(url.get('search') as string, [
          'title',
          'description',
        ])),
      },
    });
    return Response.json(res);
  };

  return handleDBRequest(dbRequest, { notFoundError: 'Статті не знайдено.' });
}
