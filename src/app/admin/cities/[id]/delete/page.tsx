import { DeleteDBItem } from '@/components/admin/delete-db-item';
import Title from '@/components/ui/title';

interface AdminDeleteCityPageProps {
  params: { id: string };
}

export default function AdminDeleteCityPage({
  params,
}: AdminDeleteCityPageProps) {
  return (
    <>
      <Title>Видалення міста</Title>

      <DeleteDBItem id={params.id} table="cities" />
    </>
  );
}
