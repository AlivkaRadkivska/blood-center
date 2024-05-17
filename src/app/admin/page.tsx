import { Button } from '@/components/ui/button';
import { SignedIn, SignOutButton, UserButton } from '@clerk/nextjs';
import { currentUser } from '@clerk/nextjs/server';

export default async function AdminPage() {
  const user = await currentUser();

  return (
    <div>
      <SignedIn>
        <div className="flex w-full items-center justify-center gap-3">
          <UserButton />
          <p>Hi there, {user?.fullName}</p>
          <SignOutButton />
        </div>
      </SignedIn>
    </div>
  );
}
