import Image from 'next/image';
import logo from '@public/images/logo.svg';
import HeaderLink from '@components/ui/header-link';

export default function Header() {
  return (
    <header className="shadow-md z-50 w-full min-h-12 flex items-center justify-around gap-3 py-1 bg-white fixed border-b-2 border-r-4 border-l-4 border-red text-red rounded-b-2xl">
      <div className="flex items-center gap-3 justify-around w-full">
        <HeaderLink href="/" label="Головна" />
        <HeaderLink href="/for-donor" label="Для донорів" />
      </div>
      <Image src={logo} alt="logo" width={100} className="w-[100px]" />
      <div className="flex items-center gap-3 justify-around w-full">
        <HeaderLink href="/locations" label="Пункти прийому" />
        <HeaderLink href="/news" label="Новини" />
      </div>
    </header>
  );
}
