'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

export default function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const { replace } = useRouter();

  const handlePagination = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());

    replace(`${pathname}?${params}`);
  };

  return (
    <div className="flex gap-3">
      {currentPage > 1 ? (
        <ChevronLeftIcon
          onClick={() => handlePagination(currentPage - 1)}
          className="size-6 text-purple hover:text-red cursor-pointer"
        />
      ) : (
        <ChevronLeftIcon className="size-6 text-gray" />
      )}

      <p>
        {currentPage}/{totalPages}
      </p>
      {currentPage < totalPages ? (
        <ChevronRightIcon
          onClick={() => handlePagination(currentPage + 1)}
          className="size-6 text-purple hover:text-red cursor-pointer"
        />
      ) : (
        <ChevronRightIcon className="size-6 text-gray" />
      )}
    </div>
  );
}
