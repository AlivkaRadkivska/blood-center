import AdminHeader from '@/components/admin-header';
import { Signout } from '@/components/admin/sign-out';
import { getUserRole } from '@/utils/auth-helper';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await currentUser();
  if (!user) redirect('/no-access');

  const role = await getUserRole(user.id);
  if (user && role != 'org:admin') return <Signout />;

  return (
    <>
      <AdminHeader />

      <main className="flex min-h-screen flex-col items-center justify-start p-3 pt-20">
        {children}
      </main>
    </>
  );
}
