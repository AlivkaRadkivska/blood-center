import { CitiesTable } from '@/components/cities/cities-table';
import { Button } from '@/components/ui/button';
import Pagination from '@/components/ui/pagination';
import Search from '@/components/ui/search';
import { getCityNumber } from '@/utils/db-helper';
import Link from 'next/link';

interface AdminCitiesPageProps {
  searchParams?: {
    search?: string;
    page?: string;
  };
}

export default async function AdminCitiesPage({
  searchParams,
}: AdminCitiesPageProps) {
  const search = searchParams?.search || '';
  const currentPage = Number(searchParams?.page) || 1;
  const limit = 10;
  const totalPages = await getCityNumber(limit, {
    search,
  });

  return (
    <>
      <div className="w-full flex flex-col sm:flex-row justify-between mb-3 gap-3">
        <Search placeholder="Назва міста" />
        <Button>
          <Link href="/admin/cities/add">Додати місто</Link>
        </Button>
      </div>

      <CitiesTable search={search} currentPage={currentPage} limit={limit} />

      <Pagination totalPages={totalPages} />
    </>
  );
}
