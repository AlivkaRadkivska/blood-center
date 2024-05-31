import { POST } from '@/app/api/questions/route';
import { NextRequest } from 'next/server';

jest.mock('@/utils/db-helper', () => ({
  handleDBRequest: jest.fn((dbRequest) => dbRequest()),
}));

describe('POST question function', () => {
  it('should return 400 error when question is not provided', async () => {
    const formData = new FormData();
    formData.append('email', 'test@example.com');

    const request = {
      formData: async () => formData,
    } as unknown as NextRequest;

    const response = await POST(request);
    expect(response.status).toBe(400);
  });
});
