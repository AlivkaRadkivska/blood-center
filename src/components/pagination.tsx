'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const { replace } = useRouter();

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());

    replace(`${pathname}?${params}`);
  };

  return (
    <div className="flex gap-3">
      {currentPage > 1 && (
        <button onClick={() => createPageURL(currentPage - 1)}>&lt;</button>
      )}
      <p>
        {currentPage}/{totalPages}
      </p>
      {currentPage < totalPages && (
        <button onClick={() => createPageURL(currentPage + 1)}>&gt;</button>
      )}
    </div>
  );
}
