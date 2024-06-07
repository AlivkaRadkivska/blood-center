import { BloodNeedsTable } from '@/components/blood-needs/blood-needs-table';
import { Button } from '@/components/ui/button';
import Pagination from '@/components/ui/pagination';
import Search from '@/components/ui/search';
import { getBloodNeedsNumber } from '@/utils/db-helper';
import Link from 'next/link';

interface AdminBloodNeedsPageProps {
  searchParams?: {
    search?: string;
    page?: string;
  };
}

export default async function AdminBloodNeedsPage({
  searchParams,
}: AdminBloodNeedsPageProps) {
  const search = searchParams?.search || '';
  const currentPage = Number(searchParams?.page) || 1;
  const limit = 10;
  const totalPages = await getBloodNeedsNumber(limit, {
    search,
  });

  return (
    <>
      <div className="w-full flex flex-col sm:flex-row justify-between mb-3 gap-3">
        <Search placeholder="Місто або група крові" />
        <Button>
          <Link href="/admin/blood-needs/add">Додати нові потреби в крові</Link>
        </Button>
      </div>

      <BloodNeedsTable
        search={search}
        currentPage={currentPage}
        limit={limit}
      />

      <Pagination totalPages={totalPages} />
    </>
  );
}
