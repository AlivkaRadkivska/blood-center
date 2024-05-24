'use server';
import { clerkClient } from '@clerk/nextjs/server';

export async function getUserRole(userId: string): Promise<string> {
  const { data } = await clerkClient.users.getOrganizationMembershipList({
    userId,
  });

  if (data.length < 1) return '';
  return data[0].role;
}

export async function validateUser(userId: string | null): Promise<boolean> {
  if (!userId) return false;

  const role = await getUserRole(userId);
  if (role != 'org:admin') return false;

  return true;
}
