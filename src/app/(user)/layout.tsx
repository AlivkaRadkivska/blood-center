import Footer from '@/components/footer';
import Header from '@/components/header';

export default async function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />

      <main className="flex flex-col flex-auto justify-start items-center p-2">
        {children}
      </main>

      <Footer />
    </>
  );
}
