import { Cormorant_Infant } from 'next/font/google';

const accentFont = Cormorant_Infant({
  subsets: ['latin', 'cyrillic'],
  weight: '700',
});

export default function Title({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${accentFont.className} text-3xl font-semibold text-red`}>
      {children}
    </div>
  );
}
