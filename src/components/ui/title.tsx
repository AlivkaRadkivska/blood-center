import { Cormorant_Infant } from 'next/font/google';

const accentFont = Cormorant_Infant({
  subsets: ['latin', 'cyrillic'],
  weight: '700',
});

export default function Title({ text }: { text: string }) {
  return (
    <p className={`${accentFont.className} text-3xl font-semibold text-red`}>
      {text}
    </p>
  );
}
