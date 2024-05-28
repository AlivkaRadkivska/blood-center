import { DeleteDBItem } from '@/components/admin/delete-db-item';
import Title from '@/components/ui/title';

interface AdminDeleteLocationPageProps {
  params: { id: string };
}

export default function AdminDeleteLocationPage({
  params,
}: AdminDeleteLocationPageProps) {
  return (
    <>
      <Title>Видалення пункту прийому крові</Title>

      <DeleteDBItem id={params.id} table="locations" />
    </>
  );
}
