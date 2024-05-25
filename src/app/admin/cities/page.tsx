import { CitiesTable } from '@/components/cities/cities-table';
import { Button } from '@/components/ui/button';
import Search from '@/components/ui/search';
import Link from 'next/link';

interface AdminCitiesPageProps {
  searchParams?: {
    search?: string;
  };
}

export default function AdminCitiesPage({
  searchParams,
}: AdminCitiesPageProps) {
  const search = searchParams?.search || '';

  return (
    <>
      <div className="w-full flex justify-between mb-2 gap-3">
        <Search placeholder="Назва міста" />
        <Button>
          <Link href="/admin/cities/add">Додати місто</Link>
        </Button>
      </div>

      <CitiesTable search={search} />
    </>
  );
}
