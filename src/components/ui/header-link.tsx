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
      className={`text-purple hover:text-red hover:underline font-bold ease-in-out ${
        active ? 'underline' : ''
      }`}
    >
      {label}
    </Link>
  );
}
