import Link from 'next/link';

export default function HeaderLink({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="text-red hover:text-purple hover:underline font-bold ease-in-out"
    >
      {label}
    </Link>
  );
}
