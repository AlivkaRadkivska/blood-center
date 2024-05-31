import {
  handleDBRequest,
  getPaginationOptions,
  getSearchParams,
} from '@/utils/db-helper';
import { db } from '@db/index';
import { Prisma } from '@prisma/client';

jest.mock('@db/index', () => ({
  db: {
    article: { count: jest.fn() },
    city: { count: jest.fn() },
    donationLocation: { count: jest.fn() },
    bloodNeeds: { count: jest.fn() },
    question: { count: jest.fn() },
  },
}));

describe('handleDBRequest', () => {
  const mockRequest = jest.fn();

  it('should return 404 error on not found', async () => {
    const error = new Prisma.PrismaClientKnownRequestError('', {
      code: 'P2025',
      clientVersion: '',
    });
    mockRequest.mockRejectedValue(error);

    const response = await handleDBRequest(mockRequest, {
      notFoundError: 'Not Found',
    });
    const jsonResponse = await response.json();

    expect(jsonResponse).toEqual({ error: 'Not Found' });
    expect(response.status).toBe(404);
  });

  it('should return 400 error on unique constraint violation', async () => {
    const error = new Prisma.PrismaClientKnownRequestError('', {
      code: 'P2002',
      clientVersion: '',
    });
    mockRequest.mockRejectedValue(error);

    const response = await handleDBRequest(mockRequest, {
      uniqueConstraintError: 'Unique constraint',
    });
    const jsonResponse = await response.json();

    expect(jsonResponse).toEqual({ error: 'Unique constraint' });
    expect(response.status).toBe(400);
  });

  it('should return 400 error on foreign key constraint violation', async () => {
    const error = new Prisma.PrismaClientKnownRequestError('', {
      code: 'P2003',
      clientVersion: '',
    });
    mockRequest.mockRejectedValue(error);

    const response = await handleDBRequest(mockRequest, {
      foreignKeyConstraintError: 'Foreign key constraint',
    });
    const jsonResponse = await response.json();

    expect(jsonResponse).toEqual({ error: 'Foreign key constraint' });
    expect(response.status).toBe(400);
  });

  it('should return 500 error on other exceptions', async () => {
    const error = new Error('Some error');
    mockRequest.mockRejectedValue(error);

    const response = await handleDBRequest(mockRequest, {});
    const jsonResponse = await response.json();

    expect(jsonResponse).toEqual({ error: 'Щось пішло не так.' });
    expect(response.status).toBe(500);
  });

  it('should return success response when no error', async () => {
    const successResponse = new Response(JSON.stringify({ success: true }), {
      status: 200,
    });
    mockRequest.mockResolvedValue(successResponse);

    const response = await handleDBRequest(mockRequest, {});
    const jsonResponse = await response.json();

    expect(jsonResponse).toEqual({ success: true });
    expect(response.status).toBe(200);
  });
});

describe('getPaginationOptions', () => {
  it('should return default pagination options', async () => {
    const url = new URLSearchParams();
    const options = await getPaginationOptions(url);
    expect(options).toEqual({});
  });

  it('should return pagination options with take and skip', async () => {
    const url = new URLSearchParams({ take: '10', page: '2' });
    const options = await getPaginationOptions(url);
    expect(options).toEqual({ take: 10, skip: 10 });
  });
});

describe('getSearchParams', () => {
  it('should return search params for given arguments', async () => {
    const search = 'test';
    const args = ['title', 'content'];
    const params = await getSearchParams(search, args);
    expect(params).toEqual({
      OR: [
        { title: { contains: search, mode: 'insensitive' } },
        { content: { contains: search, mode: 'insensitive' } },
      ],
    });
  });

  it('should return empty object if no search provided', async () => {
    const params = await getSearchParams(undefined, ['title', 'content']);
    expect(params).toEqual({});
  });
});
