import '@public/css/globals.css';
import type { Metadata } from 'next';
import { Tenor_Sans } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import { ukUA } from '@clerk/localizations';

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
    <ClerkProvider localization={ukUA}>
      <html lang="en">
        <body className={`${font.className} w-full min-h-screen flex flex-col`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
