import Link from 'next/link';

export default function Footer({ isSigned }: { isSigned: boolean }) {
  return (
    <footer className="w-full flex flex-col gap-3 items-center justify-center p-5 bg-purple text-white">
      <p>Еритро центр - інформаційний сайт про донорство крові</p>
      <p className="text-grey text-xs">Site created by Alina Radkivska</p>

      {isSigned ? (
        <Link href="/sign-in">Вхід в адмін кабінет</Link>
      ) : (
        <Link href="/admin/cities">Адмін кабінет</Link>
      )}
    </footer>
  );
}
