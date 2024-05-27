import { DeleteDBItem } from '@/components/admin/delete-db-item';
import Title from '@/components/ui/title';

interface AdminDeleteBloodNeedsPageProps {
  params: { id: string };
}

export default function AdminDeleteBloodNeedsPage({
  params,
}: AdminDeleteBloodNeedsPageProps) {
  return (
    <>
      <Title>Видалення потреб у крові</Title>

      <DeleteDBItem id={params.id} table="blood-needs" />
    </>
  );
}
