import { LocationsTable } from '@/components/locations/locations-table';
import { Button } from '@/components/ui/button';
import Search from '@/components/ui/search';
import Link from 'next/link';

interface AdminLocationsPageProps {
  searchParams?: {
    search?: string;
  };
}

export default function AdminLocationsPage({
  searchParams,
}: AdminLocationsPageProps) {
  const search = searchParams?.search || '';

  return (
    <>
      <div className="w-full flex justify-between mb-2 gap-3">
        <Search placeholder="Адреса пункту прийому" />
        <Button>
          <Link href="/admin/locations/add">Додати пункт прийому</Link>
        </Button>
      </div>

      <LocationsTable search={search} />
    </>
  );
}
