import { writeFile } from 'fs/promises';
import { v4 as uuid } from 'uuid';
import fs from 'fs/promises';

const uploadDir = './public/uploads';

function getNewImageName(name: string) {
  let newName = uuid();
  return newName + name.substring(name.lastIndexOf('.'), name.length);
}

export async function uploadImage(
  subDir: string,
  image: File
): Promise<{ imageName: string } | { message: string }> {
  if (!image.type.startsWith('image'))
    return { message: 'Файл має бути зображенням.' };

  const newImageName = getNewImageName(image.name);
  const buffer = Buffer.from(await image.arrayBuffer());

  try {
    await writeFile(`${uploadDir}/${subDir}/${newImageName}`, buffer);
  } catch (error) {
    console.log(error);
  }

  return { imageName: newImageName };
}

export async function deleteImage(
  subDir: string,
  newImageName: string
): Promise<void> {
  try {
    await fs.unlink(`${uploadDir}/${subDir}/${newImageName}`);
  } catch (error) {
    console.log(error);
  }
}
