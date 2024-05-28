import { BloodNeedsTable } from '@/components/blood-needs/blood-needs-table';
import { Button } from '@/components/ui/button';
import Search from '@/components/ui/search';
import Link from 'next/link';

interface AdminBloodNeedsPageProps {
  searchParams?: {
    search?: string;
  };
}

export default async function AdminBloodNeedsPage({
  searchParams,
}: AdminBloodNeedsPageProps) {
  const search = searchParams?.search || '';

  return (
    <>
      <div className="w-full flex justify-between mb-2 gap-3">
        <Search placeholder="Місто або група крові" />
        <Button>
          <Link href="/admin/blood-needs/add">Додати нові потреби в крові</Link>
        </Button>
      </div>

      <BloodNeedsTable search={search} />
    </>
  );
}
