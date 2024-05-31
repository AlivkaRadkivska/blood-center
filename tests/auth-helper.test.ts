import { getUserRole, validateUser } from '@/utils/auth-helper';
import { clerkClient } from '@clerk/nextjs/server';
import { getAuth } from '@clerk/nextjs/server';
import { NextRequest } from 'next/server';

jest.mock('@clerk/nextjs/server', () => ({
  clerkClient: {
    users: {
      getOrganizationMembershipList: jest.fn(),
    },
  },
  getAuth: jest.fn(),
}));

describe('getUserRole', () => {
  it('should return user role', async () => {
    const userId = 'test-user-id';
    const mockData = [{ role: 'org:admin' }];
    (
      clerkClient.users.getOrganizationMembershipList as jest.Mock
    ).mockResolvedValue({
      data: mockData,
    });

    const role = await getUserRole(userId);
    expect(role).toBe('org:admin');
  });

  it('should return empty string if no memberships found', async () => {
    const userId = 'test-user-id';
    (
      clerkClient.users.getOrganizationMembershipList as jest.Mock
    ).mockResolvedValue({
      data: [],
    });

    const role = await getUserRole(userId);

    expect(role).toBe('');
  });
});

describe('validateUser', () => {
  it('should return false if userId is not found', async () => {
    const request = {} as NextRequest;
    (getAuth as jest.Mock).mockReturnValue({ userId: null });

    const isValid = await validateUser(request);
    expect(isValid).toBe(false);
  });

  it('should return false if user role is not org:admin', async () => {
    const request = {} as NextRequest;
    const userId = 'test-user-id';
    (getAuth as jest.Mock).mockReturnValue({ userId });
    (
      clerkClient.users.getOrganizationMembershipList as jest.Mock
    ).mockResolvedValue({
      data: [{ role: 'org:member' }],
    });

    const isValid = await validateUser(request);
    expect(isValid).toBe(false);
  });

  it('should return true if user role is org:admin', async () => {
    const request = {} as NextRequest;
    const userId = 'test-user-id';
    (getAuth as jest.Mock).mockReturnValue({ userId });
    (
      clerkClient.users.getOrganizationMembershipList as jest.Mock
    ).mockResolvedValue({
      data: [{ role: 'org:admin' }],
    });

    const isValid = await validateUser(request);
    expect(isValid).toBe(true);
  });
});
