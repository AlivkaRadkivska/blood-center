'use client';
import { UserButton } from '@clerk/nextjs';
import HeaderLink from '@components/ui/header-link';
import { usePathname } from 'next/navigation';

export default function AdminHeader() {
  const pathname = usePathname();

  return (
    <header className="shadow-md z-40 w-full min-h-12 flex items-center justify-around gap-3 py-1 bg-white fixed">
      <HeaderLink href="/" label="Головна" />
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
    </header>
  );
}
