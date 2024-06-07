'use client';
import { UserButton } from '@clerk/nextjs';
import HeaderLink from '@components/ui/header-link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';

export default function AdminHeader() {
  const pathname = usePathname();
  const [openedLinks, setOpenedLinks] = useState(false);

  return (
    <header className="shadow-md z-40 w-full min-h-12 flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-3 py-1 bg-white fixed">
      <div
        className="w-full flex items-center justify-between sm:justify-start px-2"
        onClick={() => setOpenedLinks((val) => !val)}
      >
        <HeaderLink href="/" label="Головна сайту" />
        <button>
          <ChevronDownIcon
            className={`sm:hidden size-6 ml-auto transition-transform duration-200 ease-out ${
              openedLinks && 'rotate-180'
            }`}
          />
        </button>
      </div>
      <div
        className={`flex sm:flex-row items-center gap-3 p-1 justify-end w-full md:text-nowrap ${
          openedLinks ? 'flex-col' : 'hidden sm:flex'
        }`}
      >
        <HeaderLink
          href="/admin/cities"
          label="Міста"
          active={pathname == '/admin/cities'}
        />
        <HeaderLink
          href="/admin/blood-needs"
          label="Потреби в крові"
          active={pathname == '/admin/blood-needs'}
        />
        <HeaderLink
          href="/admin/locations"
          label="Пункти прийому"
          active={pathname == '/admin/locations'}
        />
        <HeaderLink
          href="/admin/articles"
          label="Статті"
          active={pathname == '/admin/articles'}
        />
        <HeaderLink
          href="/admin/questions"
          label="Питання"
          active={pathname == '/admin/questions'}
        />
        <UserButton />
      </div>
    </header>
  );
}
