'use server';
import { clerkClient } from '@clerk/nextjs/server';
import { getAuth } from '@clerk/nextjs/server';
import { NextRequest } from 'next/server';

export async function getUserRole(userId: string): Promise<string> {
  const { data } = await clerkClient.users.getOrganizationMembershipList({
    userId,
  });

  if (data.length < 1) return '';
  return data[0].role;
}

export async function validateUser(request: NextRequest): Promise<boolean> {
  const { userId } = getAuth(request);
  if (!userId) return false;

  const role = await getUserRole(userId);
  if (role != 'org:admin') return false;

  return true;
}
