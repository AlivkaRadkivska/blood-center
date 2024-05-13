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

      <main className="flex flex-col justify-top items-center p-2">
        {children}
      </main>

      <Footer />
    </>
  );
}
