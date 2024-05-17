import Image from 'next/image';
import Link from 'next/link';
import logo from '@public/images/logo.svg';
import HeaderLink from '@components/ui/header-link';

export default function Header() {
  return (
    <header className="z-999 w-full min-h-12 flex items-center justify-around gap-3 py-1 bg-white fixed border-b-2 border-r-4 border-l-4 border-red text-red rounded-b-2xl">
      <Link href="/">
        <Image src={logo} alt="logo" width={100} />
      </Link>
      <HeaderLink href="/" label="Головна" />
      <HeaderLink href="/for-donor" label="Для донорів" />
      <HeaderLink href="/locations" label="Пункти прийому" />
      <HeaderLink href="/news" label="Новини" />
    </header>
  );
}
