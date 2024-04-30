import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Erytro Center',
  description: 'Web site for blood center',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <html lang="en">{children}</html>;
}
