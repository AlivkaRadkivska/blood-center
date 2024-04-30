import { Lora } from 'next/font/google';

const font = Lora({ subsets: ['latin', 'cyrillic'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <body className={font.className}>
      <header className="w-full flex items-start justify-center">
        Admin Header
      </header>

      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        {children}
      </main>
    </body>
  );
}
