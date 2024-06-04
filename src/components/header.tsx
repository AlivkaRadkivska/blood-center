'use client';
import Image from 'next/image';
import logo from '@public/images/logo.svg';
import HeaderLink from '@components/ui/header-link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';

export default function Header() {
  const pathname = usePathname();
  const [openedLinks, setOpenedLinks] = useState(false);

  return (
    <header className="w-full shadow-md z-40 flex flex-col sm:flex-row items-center justify-around gap-3 p-1 bg-white fixed border-b border-black">
      <div
        className={`flex sm:flex-row items-center gap-3 justify-around w-full ${
          openedLinks ? 'flex-col' : 'hidden sm:flex'
        }`}
      >
        <HeaderLink href="/" label="Головна" active={pathname == '/'} />
        <HeaderLink
          href="/for-donor"
          label="Для донорів"
          active={pathname == '/for-donor'}
        />
      </div>

      <div
        className="w-full sm:max-w-[100px] flex items-center justify-between sm:justify-center px-2 -order-1 sm:order-[revert-layer]"
        onClick={() => setOpenedLinks((val) => !val)}
      >
        <Image src={logo} alt="logo" width={100} className="w-[100px]" />
        <button>
          <ChevronDownIcon
            className={`sm:hidden size-6 ml-auto transition-transform duration-200 ease-out ${
              openedLinks && 'rotate-180'
            }`}
          />
        </button>
      </div>

      <div
        className={`flex sm:flex-row items-center gap-3 justify-around w-full ${
          openedLinks ? 'flex-col' : 'hidden sm:flex'
        }`}
      >
        <HeaderLink
          href="/locations"
          label="Пункти прийому"
          active={pathname == '/locations'}
        />
        <HeaderLink href="/news" label="Новини" active={pathname == '/news'} />
      </div>
    </header>
  );
}
