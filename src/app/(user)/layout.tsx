import Footer from '@/components/footer';
import Header from '@/components/header';
import { currentUser } from '@clerk/nextjs/server';

export default async function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = currentUser();

  return (
    <>
      <Header />

      <main className="flex flex-col flex-auto justify-start items-center p-2">
        {children}
      </main>

      <Footer isSigned={user != null} />
    </>
  );
}
