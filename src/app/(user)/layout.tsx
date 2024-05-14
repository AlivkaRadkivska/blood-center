import Footer from '@/components/footer';
import Header from '@/components/header';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />

      <main className="flex flex-col flex-auto justify-center items-center p-2">
        {children}
      </main>

      <Footer />
    </>
  );
}
