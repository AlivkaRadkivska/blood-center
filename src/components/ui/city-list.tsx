'use client';
import { CityT } from '@/types/city';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function CityList({ cities }: { cities: CityT[] }) {
  const searchParams = useSearchParams();
  const region = searchParams?.get('region') || '';
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleClick(id: string) {
    const params = new URLSearchParams(searchParams);
    params.set('region', id);
    params.delete('search');

    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="border-t-1 border-purple text-purple cursor-pointer w-full">
      <p className="py-2 text-lg text-purple">Фільтр за областю:</p>
      <p
        className={region === '' ? 'text-red underline' : ''}
        onClick={() => handleClick('')}
      >
        Усі
      </p>
      {cities.map((item) => (
        <p
          key={item.id}
          onClick={() => handleClick(item.id)}
          className={region === item.id ? 'text-red underline' : ''}
        >
          {item.name}
        </p>
      ))}
    </div>
  );
}