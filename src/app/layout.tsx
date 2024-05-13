import type { Metadata } from 'next';
import '@public/css/globals.css';
import { Tenor_Sans } from 'next/font/google';

const font = Tenor_Sans({
  subsets: ['latin', 'cyrillic'],
  weight: '400',
});

export const metadata: Metadata = {
  title: 'Erytro Center',
  description: 'Web site for blood center',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${font.className} w-full`}>{children}</body>
    </html>
  );
}
