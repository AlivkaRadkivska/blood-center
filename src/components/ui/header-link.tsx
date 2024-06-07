import Link from 'next/link';

interface HeaderLinkProps {
  href: string;
  label: string;
  active?: boolean;
}

export default function HeaderLink({ href, label, active }: HeaderLinkProps) {
  return (
    <Link
      href={href}
      className={`text-purple hover:text-red hover:underline hover:underline-offset-8 font-bold ease-in-out text-center ${
        active ? 'underline' : ''
      }`}
    >
      {label}
    </Link>
  );
}
