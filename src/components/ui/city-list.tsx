'use client';
import { CityT } from '@/types/city';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function CityList({ cities }: { cities: CityT[] }) {
  const searchParams = useSearchParams();
  const city = searchParams?.get('city') || '';
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleClick(id: string) {
    const params = new URLSearchParams(searchParams);
    params.set('city', id);
    params.delete('search');

    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="border-t-1 border-purple text-purple cursor-pointer w-full text-center sm:text-left">
      <p className="py-2 text-sm text-purple">Фільтр за містом:</p>
      <p
        className={city === '' ? 'text-red underline' : ''}
        onClick={() => handleClick('')}
      >
        Усі
      </p>
      {cities.map((item) => (
        <p
          key={item.id}
          onClick={() => handleClick(item.id)}
          className={city === item.id ? 'text-red underline' : ''}
        >
          {item.name}
        </p>
      ))}
    </div>
  );
}
