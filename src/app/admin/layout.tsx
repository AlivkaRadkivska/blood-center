import { Signout } from '@/components/admin/sign-out';
import { clerkClient, currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

async function getUserRole(userId: string): Promise<string> {
  const { data } = await clerkClient.users.getOrganizationMembershipList({
    userId,
  });

  if (data.length < 1) return '';
  return data[0].role;
}

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await currentUser();
  if (!user) redirect('/');

  const role = await getUserRole(user.id);
  if (user && role != 'org:admin') return <Signout />;

  return (
    <>
      <header className="w-full flex items-start justify-center">
        Admin Header
      </header>

      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        {children}
      </main>
    </>
  );
}
