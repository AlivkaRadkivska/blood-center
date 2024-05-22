'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((search) => {
    const params = new URLSearchParams(searchParams);

    if (search) {
      params.delete('page');
      params.delete('region');
      params.set('search', search);
    } else {
      params.delete('search');
    }

    replace(`${pathname}?${params.toString()}`);
  }, 400);

  return (
    <div className="relative flex flex-1">
      <label htmlFor="search" className="sr-only">
        Пошук
      </label>
      <input
        className="ease-in-out duration-200 px-4 py-1 border-2 border-purple text-purple rounded-lg focus:outline-red w-full min-w-40 pl-8"
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        id="search"
        defaultValue={searchParams.get('search')?.toString()}
      />
      <p className="absolute left-3 top-1/2 h-[24px] w-[24px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900">
        ⌕
      </p>
    </div>
  );
}
