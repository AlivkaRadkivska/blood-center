import { LocationsTable } from '@/components/locations/locations-table';
import { Button } from '@/components/ui/button';
import Pagination from '@/components/ui/pagination';
import Search from '@/components/ui/search';
import { getLocationNumber } from '@/utils/db-helper';
import Link from 'next/link';

interface AdminLocationsPageProps {
  searchParams?: {
    search?: string;
    page?: string;
  };
}

export default async function AdminLocationsPage({
  searchParams,
}: AdminLocationsPageProps) {
  const search = searchParams?.search || '';
  const currentPage = Number(searchParams?.page) || 1;
  const limit = 10;
  const totalPages = await getLocationNumber(limit, {
    search,
  });

  return (
    <>
      <div className="w-full flex justify-between mb-2 gap-3">
        <Search placeholder="Адреса пункту прийому" />
        <Button>
          <Link href="/admin/locations/add">Додати пункт прийому</Link>
        </Button>
      </div>

      <LocationsTable search={search} currentPage={currentPage} limit={limit} />

      <Pagination totalPages={totalPages} />
    </>
  );
}
