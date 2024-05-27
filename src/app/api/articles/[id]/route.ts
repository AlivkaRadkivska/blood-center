import { validateUser } from '@/utils/auth-helper';
import { handleDBRequest } from '@/utils/db-helper';
import { deleteImage, uploadImage } from '@/utils/file-handler';
import { db } from '@db/index';
import { NextRequest } from 'next/server';

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
): Promise<Response> {
  const dbRequest = async () => {
    const id: string = params.id;

    const res = await db.article.findUnique({ where: { id } });
    return Response.json(res);
  };

  return handleDBRequest(dbRequest, { notFoundError: 'Статтю не знайдено.' });
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<Response> {
  if (!(await validateUser(request)))
    return Response.json({ error: 'Доступ заборонено.', status: 401 });

  const dbRequest = async () => {
    const id: string = params.id;
    const data = await request.formData();
    const title = data.get('title') as string;
    const content = data.get('content') as string;
    const photoFile = data.get('photo') as unknown as File;
    let photoName = data.get('oldPhoto') as string;

    if (photoFile.size > 0) {
      const uploadingRes = await uploadImage('articles', photoFile);

      if ('message' in uploadingRes)
        return Response.json({ error: uploadingRes.message }, { status: 400 });
      else {
        deleteImage('articles', photoName);
        photoName = uploadingRes.imageName;
      }
    }

    const res = await db.article.update({
      data: { title, content, photo: photoName },
      where: { id },
    });

    return Response.json(res);
  };

  return handleDBRequest(dbRequest, { notFoundError: 'Статтю не знайдено.' });
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
): Promise<Response> {
  const dbRequest = async () => {
    const id: string = params.id;

    const res = await db.article.delete({ where: { id } });
    return Response.json(res);
  };

  return handleDBRequest(dbRequest, { notFoundError: 'Статтю не знайдено.' });
}
