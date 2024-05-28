'use client';
import { useClerk } from '@clerk/nextjs';

export function Signout() {
  const { signOut } = useClerk();
  signOut({ redirectUrl: '/' });

  return <></>;
}
