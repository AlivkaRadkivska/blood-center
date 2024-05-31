import { uploadImage } from '@/utils/file-handler';
import { put } from '@vercel/blob';

jest.mock('@vercel/blob', () => ({
  put: jest.fn(),
}));

describe('Upload image function', () => {
  it('should return error when is not image', async () => {
    const video = new File([], 'video.mp4', {
      type: 'video',
    });

    const response = await uploadImage(video);
    expect(response).toEqual({ message: 'Файл має бути зображенням.' });
  });

  it('should return image url', async () => {
    const image = new File([], 'img.png', {
      type: 'image',
    });
    const mockImageUrl = 'http://example.com/newImageName.png';
    (put as jest.Mock).mockResolvedValue({ url: mockImageUrl });

    const response = await uploadImage(image);
    expect(response).toHaveProperty('imageUrl', mockImageUrl);
  });
});
